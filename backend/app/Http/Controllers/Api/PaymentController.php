<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use App\Models\User;
use App\Models\Tour;
use App\Models\HotelRoom;
use App\Models\RestaurantTable;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{
    // =========================
    // 1. TẠO LINK THANH TOÁN
    // =========================
    public function createPayment(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|integer',
            'user_id'    => 'required|integer',
            'price'      => 'required|numeric|min:1',
        ]);

        $payment = Payment::create([
            'booking_id' => $request->booking_id,
            'user_id'    => $request->user_id,
            'amount'     => $request->price,
            'method'     => 'vnpay',
            'status'     => 'pending',
        ]);

        $vnp_TmnCode    = config('vnpay.tmn_code');
        $vnp_HashSecret = config('vnpay.hash_secret');
        $vnp_Url        = config('vnpay.url');
        $vnp_ReturnUrl  = config('vnpay.return_url');

        $vnpCreateDate = now()->setTimezone('Asia/Ho_Chi_Minh')->format('YmdHis');
        $vnpExpireDate = now()->setTimezone('Asia/Ho_Chi_Minh')->addMinutes(15)->format('YmdHis');

        $inputData = [
            "vnp_Version"    => "2.1.0",
            "vnp_Command"    => "pay",
            "vnp_TmnCode"    => $vnp_TmnCode,
            "vnp_Amount"     => (int)($request->price * 100),
            "vnp_CurrCode"   => "VND",
            "vnp_TxnRef"     => $payment->id . '_' . time(),
            "vnp_OrderInfo"  => "Thanh toan booking " . $payment->id,
            "vnp_OrderType"  => "billpayment",
            "vnp_Locale"     => "vn",
            "vnp_ReturnUrl"  => $vnp_ReturnUrl,
            "vnp_IpAddr"     => $request->ip(),
            "vnp_CreateDate" => $vnpCreateDate,
            "vnp_ExpireDate" => $vnpExpireDate,
        ];

        ksort($inputData);

        $query = "";
        $hashData = "";
        $i = 0;

        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . "&";
        }

        $query = rtrim($query, "&");

        $vnpSecureHash = hash_hmac("sha512", $hashData, $vnp_HashSecret);

        $paymentUrl = $vnp_Url . "?" . $query . "&vnp_SecureHash=" . $vnpSecureHash;

        return response()->json([
            'payment_url' => $paymentUrl
        ]);
    }


    // =========================
    // 2. VNPay RETURN (USER)
    // =========================
    public function vnpayReturn(Request $request)
    {
        $vnp_HashSecret = config('vnpay.hash_secret');

        $inputData = [];

        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) === "vnp_" && $key !== "vnp_SecureHash") {
                $inputData[$key] = $value;
            }
        }

        ksort($inputData);

        $hashData = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $checkHash = hash_hmac("sha512", $hashData, $vnp_HashSecret);

        // Kiểm tra chữ ký
        if ($checkHash !== $request->vnp_SecureHash) {
            return redirect('http://localhost:5173/payment-success?status=error');
        }

        $txnRef = explode('_', $request->vnp_TxnRef)[0];
        $payment = Payment::find($txnRef);
        if (!$payment) {
            return redirect('http://localhost:5173/payment-success?status=error');
        }

        // Nếu thanh toán thất bại
        if ($request->vnp_ResponseCode !== '00') {
            $payment->update(['status' => 'failed']);
            return redirect('http://localhost:5173/payment-success?status=error');
        }

        // Thành công
        $payment->update([
            'status' => 'completed',
            'transaction_code' => $request->vnp_TransactionNo,
        ]);

        $booking = Booking::find($payment->booking_id);
        $booking->update(['status' => 'paid']);

        // Gửi webhook n8n
        $this->sendN8nWebhook($booking);
        $this->notifyPaymentSuccess($booking);

        return redirect('http://localhost:5173/payment-success?status=success');
    }


    // =========================
    // 3. VNPay IPN (SERVER)
    // =========================
    public function vnpayIpn(Request $request)
    {
        $vnp_HashSecret = config('vnpay.hash_secret');

        $inputData = [];

        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) === "vnp_" && $key !== "vnp_SecureHash") {
                $inputData[$key] = $value;
            }
        }

        ksort($inputData);

        $hashData = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $checkHash = hash_hmac("sha512", $hashData, $vnp_HashSecret);

        if ($checkHash !== $request->vnp_SecureHash) {
            return response()->json(['RspCode' => '97', 'Message' => 'Invalid signature']);
        }

        $txnRef = explode('_', $request->vnp_TxnRef)[0];
        $payment = Payment::find($txnRef);

        if (!$payment) {
            return response()->json(['RspCode' => '01', 'Message' => 'Order not found']);
        }

        if ($request->vnp_ResponseCode === '00') {
            $payment->update(['status' => 'completed']);

            $booking = Booking::find($payment->booking_id);
            $booking->update(['status' => 'paid']);

            // Gửi webhook n8n
            $this->sendN8nWebhook($booking);
            $this->notifyPaymentSuccess($booking);

            return response()->json(['RspCode' => '00', 'Message' => 'Confirm Success']);
        }

        $payment->update(['status' => 'failed']);
        return response()->json(['RspCode' => '00', 'Message' => 'Payment Failed']);
    }

    /**
     * Tạo notification khi thanh toán thành công
     */
    private function notifyPaymentSuccess(Booking $booking)
    {
        try {
            $typeLabel = ucfirst($booking->booking_type);
            $amount = number_format($booking->total_amount) . ' VNĐ';

            // Notify user
            Notification::notifyUser(
                $booking->user_id,
                'payment_success',
                'Thanh toán thành công',
                "Booking #{$booking->id} ({$typeLabel}) - {$amount} đã được thanh toán thành công!",
                ['booking_id' => $booking->id]
            );

            // Notify admin
            Notification::notifyAdmin(
                'payment_success',
                'Thanh toán mới',
                "Booking #{$booking->id} ({$typeLabel}) - {$amount} thanh toán thành công",
                ['booking_id' => $booking->id, 'user_id' => $booking->user_id]
            );
        } catch (\Exception $e) {
            \Log::error('Payment notification error: ' . $e->getMessage());
        }
    }

    /**
     * Gửi dữ liệu booking sang n8n webhook
     */
    private function sendN8nWebhook(Booking $booking)
    {
        $webhookUrl = env('N8N_WEBHOOK_URL');
        if (!$webhookUrl) return;

        try {
            $user = User::find($booking->user_id);
            $serviceName = '';
            $type = $booking->booking_type;

            if ($type === 'tour') {
                $tour = Tour::find($booking->target_id);
                $serviceName = $tour ? $tour->name : '';
            } elseif ($type === 'hotel') {
                $room = HotelRoom::find($booking->target_id);
                $serviceName = $room ? $room->name : '';
            } elseif ($type === 'restaurant') {
                $table = RestaurantTable::find($booking->target_id);
                $serviceName = $table ? $table->name : '';
            }

            Http::post($webhookUrl, [
                'booking_id'     => $booking->id,
                'customer_name'  => $user ? $user->name : '',
                'customer_email' => $user ? $user->email : '',
                'service_name'   => $serviceName,
                'booking_type'   => ucfirst($type),
                'quantity'       => $booking->quantity,
                'check_in'       => $booking->check_in,
                'check_out'      => $booking->check_out,
                'total_amount'   => $booking->total_amount,
            ]);
        } catch (\Exception $e) {
            \Log::error('N8N Webhook error: ' . $e->getMessage());
        }
    }

    // =========================
    // 4. MoMo - TẠO LINK THANH TOÁN
    // =========================
    public function createMomoPayment(Request $request)
    {
        try {
            $endpoint    = env('MOMO_API_ENDPOINT');
            $partnerCode = env('MOMO_PARTNER_CODE');
            $accessKey   = env('MOMO_ACCESS_KEY');
            $secretKey   = env('MOMO_SECRET_KEY');

            $bookingId = $request->booking_id;
            $price     = $request->price;
            $userId    = $request->user_id;

            if (!$bookingId || !$price || !$userId) {
                return response()->json(['message' => 'Missing booking_id, price or user_id'], 400);
            }

            $payment = Payment::create([
                'booking_id' => $bookingId,
                'user_id'    => $userId,
                'amount'     => $price,
                'method'     => 'momo',
                'status'     => 'pending',
            ]);

            $orderId     = strval($payment->id . '_' . time());
            $requestId   = strval(time());
            $orderInfo   = "Thanh toan booking " . $bookingId;
            $amount      = strval(intval($price));
            $redirectUrl = env('MOMO_RETURN_URL');
            $ipnUrl      = env('MOMO_IPN_URL');
            $extraData   = "";
            $requestType = "captureWallet";

            $rawHash = "accessKey=" . $accessKey
                . "&amount=" . $amount
                . "&extraData=" . $extraData
                . "&ipnUrl=" . $ipnUrl
                . "&orderId=" . $orderId
                . "&orderInfo=" . $orderInfo
                . "&partnerCode=" . $partnerCode
                . "&redirectUrl=" . $redirectUrl
                . "&requestId=" . $requestId
                . "&requestType=" . $requestType;

            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            $data = [
                'partnerCode' => $partnerCode,
                'partnerName' => "Travel SE Asia",
                'storeId'     => "MomoStore",
                'requestId'   => $requestId,
                'amount'      => $amount,
                'orderId'     => $orderId,
                'orderInfo'   => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl'      => $ipnUrl,
                'lang'        => 'vi',
                'extraData'   => $extraData,
                'requestType' => $requestType,
                'signature'   => $signature,
            ];

            $response = Http::post($endpoint, $data);
            $result   = $response->json();

            if ($result && isset($result['payUrl'])) {
                $payment->update(['transaction_code' => $orderId]);
                return response()->json(['payment_url' => $result['payUrl']]);
            }

            return response()->json([
                'message' => 'MoMo Error: ' . ($result['message'] ?? 'Unknown error')
            ], 500);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    // =========================
    // 5. MoMo RETURN (USER)
    // =========================
    public function momoReturn(Request $request)
    {
        $resultCode = $request->resultCode;
        $orderId    = $request->orderId;

        if ($resultCode == 0) {
            $payment = Payment::where('transaction_code', $orderId)->first();
            if ($payment) {
                $payment->update(['status' => 'completed']);
                $booking = Booking::find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') {
                    $booking->update(['status' => 'paid']);
                    $this->sendN8nWebhook($booking);
                    $this->notifyPaymentSuccess($booking);
                }
            }
            return redirect('http://localhost:5173/payment-success?status=success');
        }

        return redirect('http://localhost:5173/payment-success?status=error');
    }

    // =========================
    // 6. MoMo IPN (SERVER)
    // =========================
    public function momoIpn(Request $request)
    {
        \Log::info("MoMo IPN Data: " . json_encode($request->all()));

        $resultCode = $request->resultCode;

        if ($resultCode == 0) {
            $payment = Payment::where('transaction_code', $request->orderId)->first();
            if ($payment) {
                $payment->update(['status' => 'completed']);
                $booking = Booking::find($payment->booking_id);
                if ($booking && $booking->status !== 'paid') {
                    $booking->update(['status' => 'paid']);
                    $this->sendN8nWebhook($booking);
                    $this->notifyPaymentSuccess($booking);
                }
            }
        }

        return response()->json([], 204);
    }
}
