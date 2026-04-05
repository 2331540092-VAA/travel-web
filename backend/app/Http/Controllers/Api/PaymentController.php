<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Tour;
use App\Models\HotelRoom;
use App\Models\RestaurantTable;
use App\Mail\BookingSuccessMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    private function triggerN8NWebhook($bookingId)
    {
        try {
            $webhookUrl = env('N8N_WEBHOOK_URL');
            if (!$webhookUrl) {
                Log::warning("N8N_WEBHOOK_URL is not configured in .env");
                return;
            }

            $booking = Booking::with(['user', 'tour', 'hotelRoom', 'restaurantTable'])->find($bookingId);
            if (!$booking) {
                Log::warning("Booking #$bookingId not found for n8n trigger.");
                return;
            }

            $productName = 'Dịch vụ không xác định';
            if ($booking->tour) $productName = $booking->tour->title;
            elseif ($booking->hotelRoom) $productName = "Phòng khách sạn: " . $booking->hotelRoom->room_number;
            elseif ($booking->restaurantTable) $productName = "Bàn nhà hàng: " . $booking->restaurantTable->table_number;

            $data = [
                'booking_id' => $booking->id,
                'customer_name' => $booking->user->name ?? 'Khách hàng',
                'customer_email' => $booking->user->email ?? 'N/A',
                'product_name' => $productName,
                'total_amount' => $booking->total_amount ?? $booking->price, // dự phòng trường hợp cột khác nhau
                'booking_date' => $booking->booking_date,
                'status' => 'paid',
                'payment_method' => 'Online Payment',
                'timestamp' => now()->toIso8601String()
            ];

            Log::info("Triggering n8n webhook for Booking #$bookingId", ['url' => $webhookUrl]);
            $response = Http::post($webhookUrl, $data);
            
            if ($response->successful()) {
                Log::info("N8N Webhook sent successfully for Booking #$bookingId");
            } else {
                Log::error("N8N Webhook failed for Booking #$bookingId: Status " . $response->status() . " - " . $response->body());
            }
        } catch (\Exception $e) {
            Log::error("Error triggering n8n webhook for Booking #$bookingId: " . $e->getMessage());
        }
    }

    /**
     * PayOS Methods
     */
    public function createPayosPayment(Request $request)
    {
        try {
            $clientId = env('PAYOS_CLIENT_ID');
            $apiKey = env('PAYOS_API_KEY');
            $checksumKey = env('PAYOS_CHECKSUM_KEY');
            $bookingId = $request->booking_id;
            $price = $request->price;
            $userId = $request->user_id;

            if (!$bookingId || !$price || !$userId) {
                return response()->json(['message' => 'Missing booking_id, price or user_id'], 400);
            }

            $payment = Payment::create([
                'booking_id' => $bookingId,
                'user_id' => $userId,
                'amount' => $price,
                'method' => 'payos',
                'status' => 'pending'
            ]);

            $orderCode = intval($payment->id . time() % 10000); 
            $amount = intval($price);
            $description = "Thanh toan Booking #" . $bookingId;
            $returnUrl = env('PAYOS_RETURN_URL', 'http://127.0.0.1:8000/api/payment/payos-return');
            $cancelUrl = env('PAYOS_CANCEL_URL', 'http://127.0.0.1:5173/payment-return?status=cancel');

            $data = ["amount" => $amount, "cancelUrl" => $cancelUrl, "description" => $description, "orderCode" => $orderCode, "returnUrl" => $returnUrl];
            ksort($data);
            $signatureContent = "";
            foreach ($data as $key => $value) { $signatureContent .= ($signatureContent ? "&" : "") . $key . "=" . $value; }
            $signature = hash_hmac("sha256", $signatureContent, $checksumKey);
            $data["signature"] = $signature;

            $response = Http::withHeaders(['x-client-id' => $clientId, 'x-api-key' => $apiKey, 'Content-Type' => 'application/json'])
                            ->post('https://api-merchant.payos.vn/v2/payment-requests', $data);
            $result = $response->json();

            if ($result && $result['code'] === "00") {
                $payment->update(['transaction_id' => $orderCode]);
                return response()->json(['payment_url' => $result['data']['checkoutUrl']]);
            }
            return response()->json(['message' => 'PayOS Error: ' . ($result['desc'] ?? 'Unknown error')], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function payosReturn(Request $request)
    {
        $status = $request->status;
        $orderCode = $request->orderCode;
        if ($status === 'PAID') {
            $payment = Payment::where('transaction_id', $orderCode)->first();
            if ($payment) {
                $payment->update(['status' => 'completed', 'response_code' => $status]);
                $booking = Booking::find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
            }
            return redirect(env('FRONTEND_URL', 'http://127.0.0.1:5173') . '/payment-success?status=success&message=' . urlencode('Thanh toán PayOS thành công'));
        }
        return redirect(env('FRONTEND_URL', 'http://127.0.0.1:5173') . '/payment-return?status=error&message=' . urlencode('Thanh toán PayOS thất bại hoặc bị hủy'));
    }

    public function payosWebhook(Request $request)
    {
        try {
            $body = $request->all();
            $data = $body['data'];
            $requestSignature = $body['signature'];
            $checksumKey = env('PAYOS_CHECKSUM_KEY');
            ksort($data);
            $signatureContent = "";
            foreach ($data as $key => $value) {
                if ($value === null) continue;
                $signatureContent .= ($signatureContent ? "&" : "") . $key . "=" . (is_array($value) ? json_encode($value) : $value);
            }
            $signature = hash_hmac("sha256", $signatureContent, $checksumKey);
            if ($signature !== $requestSignature) {
                Log::warning("PayOS Webhook: Invalid signature.");
                return response()->json(['message' => 'Invalid signature but accepted for test'], 200);
            }
            $orderCode = $data['orderCode'];
            $payment = Payment::where('transaction_id', $orderCode)->first();
            if ($payment && $data['desc'] === 'success') {
                $payment->update(['status' => 'completed', 'response_code' => 'PAID']);
                $booking = Booking::find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
            }
            return response()->json(['message' => 'Webhook received']);
        } catch (\Exception $e) { return response()->json(['message' => 'Error: ' . $e->getMessage()], 500); }
    }

    public function simulatePayosSuccess(Request $request)
    {
        try {
            $bookingId = $request->booking_id;
            $payment = Payment::where('booking_id', $bookingId)->where('method', 'payos')->latest()->first();
            if ($payment) {
                $payment->update(['status' => 'completed', 'response_code' => 'SIMULATED']);
                $booking = Booking::find($bookingId);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
                return response()->json(['message' => 'Simulated success successfully']);
            }
            return response()->json(['message' => 'Payment not found'], 404);
        } catch (\Exception $e) { return response()->json(['message' => 'Error: ' . $e->getMessage()], 500); }
    }

    /**
     * MoMo Methods
     */
    public function createMomoPayment(Request $request)
    {
        try {
            $endpoint = env('MOMO_API_ENDPOINT');
            $partnerCode = env('MOMO_PARTNER_CODE');
            $accessKey = env('MOMO_ACCESS_KEY');
            $secretKey = env('MOMO_SECRET_KEY');

            $bookingId = $request->booking_id;
            $price = $request->price;
            $userId = $request->user_id;

            $payment = Payment::create([
                'booking_id' => $bookingId,
                'user_id' => $userId,
                'amount' => $price,
                'method' => 'momo',
                'status' => 'pending'
            ]);

            $orderId = strval($payment->id . '_' . time());
            $requestId = strval(time());
            $orderInfo = "Thanh toán giao dịch MoMo cho Booking #" . $bookingId;
            $amount = strval($price);
            $redirectUrl = env('MOMO_RETURN_URL');
            $ipnUrl = env('MOMO_IPN_URL');
            $extraData = "";
            $requestType = "captureWallet";

            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            $data = [
                'partnerCode' => $partnerCode,
                'partnerName' => "Travel SE Asia",
                'storeId' => "MomoStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            ];

            $response = Http::post($endpoint, $data);
            $result = $response->json();

            if ($result && isset($result['payUrl'])) {
                $payment->update(['transaction_id' => $orderId]);
                return response()->json(['payment_url' => $result['payUrl']]);
            }

            return response()->json(['message' => 'MoMo Error: ' . ($result['message'] ?? 'Unknown error')], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function momoReturn(Request $request)
    {
        $resultCode = $request->resultCode;
        $orderId = $request->orderId;

        if ($resultCode == 0) {
            $payment = Payment::where('transaction_id', $orderId)->first();
            if ($payment) {
                $payment->update(['status' => 'completed', 'response_code' => $resultCode]);
                $booking = Booking::find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
            }
            return redirect(env('FRONTEND_URL', 'http://127.0.0.1:5173') . '/payment-success?status=success&message=' . urlencode('Thanh toán MoMo thành công'));
        }
        return redirect(env('FRONTEND_URL', 'http://127.0.0.1:5173') . '/payment-return?status=error&message=' . urlencode('Thanh toán MoMo thất bại: ' . $request->message));
    }

    public function momoIpn(Request $request)
    {
        Log::info("MoMo IPN Data: " . json_encode($request->all()));
        $resultCode = $request->resultCode;
        if ($resultCode == 0) {
            $payment = Payment::where('transaction_id', $request->orderId)->first();
            if ($payment) {
                $payment->update(['status' => 'completed', 'response_code' => $resultCode]);
                $booking = Booking::with('user')->find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
            }
        }
        return response()->json([], 204);
    }

    public function simulateMomoSuccess(Request $request)
    {
        try {
            $bookingId = $request->booking_id;
            $payment = Payment::where('booking_id', $bookingId)
                             ->where('method', 'momo')
                             ->latest()
                             ->first();

            if ($payment) {
                $payment->update([
                    'status' => 'completed',
                    'response_code' => '0'
                ]);

                $booking = Booking::with('user')->find($bookingId);
                if ($booking && $booking->status !== 'paid') { 
                    $booking->update(['status' => 'paid']); 
                    $this->triggerN8NWebhook($booking->id);
                }
                return response()->json(['message' => 'Simulated MoMo success successfully']);
            }

            return response()->json(['message' => 'Payment not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}