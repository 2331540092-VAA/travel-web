<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        try {
            $vnp_Url = env('VNP_URL', "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");
            $vnp_TmnCode = env('VNP_TMN_CODE');
            $vnp_HashSecret = env('VNP_HASH_SECRET');
            // Ensure return URL is trimmed and has a sensible fallback
            $vnp_Returnurl = trim(env('VNP_RETURN_URL', 'http://127.0.0.1:8000/api/payment/vnpay-return'));

            $bookingId = $request->booking_id;
            $price = $request->price;
            $userId = $request->user_id;

            if (!$bookingId || !$price || !$userId) {
                return response()->json(['message' => 'Missing booking_id, price or user_id'], 400);
            }

            // Tạo Payment record
            $payment = Payment::create([
                'booking_id' => $bookingId,
                'user_id' => $userId,
                'amount' => $price,
                'method' => 'vnpay',
                'status' => 'pending'
            ]);

            $vnp_TxnRef = $payment->id;
            $vnp_OrderInfo = "Thanh toan Booking ID: " . $bookingId;
            $vnp_OrderType = "billpayment";
            $vnp_Amount = $price * 100;
            $vnp_Locale = "vn";
            $vnp_BankCode = "";
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

            $inputData = array(
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Amount" => $vnp_Amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => $vnp_OrderInfo,
                "vnp_OrderType" => $vnp_OrderType,
                "vnp_ReturnUrl" => $vnp_Returnurl,
                "vnp_TxnRef" => $vnp_TxnRef
            );

            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $vnp_Url = $vnp_Url . "?" . $query;
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;

            return response()->json(['payment_url' => $vnp_Url]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function vnpayReturn(Request $request)
    {
        $vnp_HashSecret = env('VNP_HASH_SECRET');
        $vnp_SecureHash = $request->vnp_SecureHash;
        $inputData = $request->all();
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);

        $hashData = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($secureHash == $vnp_SecureHash) {
            if ($request->vnp_ResponseCode == '00') {
                // Payment successful - update database
                $paymentId = $request->vnp_TxnRef;
                $payment = Payment::find($paymentId);

                if ($payment) {
                    // Update payment status to completed
                    $payment->update([
                        'status' => 'completed',
                        'transaction_id' => $request->vnp_TransactionNo,
                        'response_code' => $request->vnp_ResponseCode
                    ]);

                    // Update booking status to paid
                    $booking = Booking::find($payment->booking_id);
                    if ($booking) {
                        $booking->update(['status' => 'paid']);
                    }
                }

                // Redirect to frontend success page
                return redirect('http://localhost:5173/payment-success?status=success&message=' . urlencode('Thanh toán thành công'));
            }
            // Payment failed - redirect to frontend with error
            return redirect('http://localhost:5173/payment-return?status=error&message=' . urlencode('Thanh toán thất bại hoặc bị hủy'));
        }
        // Invalid signature - redirect to frontend with error
        return redirect('http://localhost:5173/payment-return?status=error&message=' . urlencode('Chữ ký không hợp lệ'));
    }
}