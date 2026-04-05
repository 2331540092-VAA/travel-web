<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        try {
            $userId = auth()->id() ?? $request->user_id;

            if (!$userId) {
                return response()->json(['message' => 'Unauthenticated', 'debug' => 'No user_id'], 401);
            }

            $booking = Booking::create([
                'user_id' => $userId,
                'booking_type' => $request->booking_type,
                'target_id' => $request->target_id,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'booking_date' => $request->booking_date,
                'quantity' => $request->quantity,
                'total_amount' => $request->total_amount,
            ]);

            return response()->json($booking);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function myBookings()
    {
        $userId = auth()->id() ?? request('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json(
            Booking::where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    public function show($id)
    {
        $userId = auth()->id() ?? request('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::where('id', $id)->where('user_id', $userId)->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json($booking);
    }

    public function cancel($id)
    {
        $userId = auth()->id() ?? request('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::where('id', $id)->where('user_id', $userId)->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        if ($booking->status === 'cancelled') {
            return response()->json(['message' => 'Booking đã hủy'], 400);
        }

        if ($booking->status === 'paid') {
            return response()->json(['message' => 'Booking đã thanh toán, không thể hủy'], 400);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Đã hủy booking', 'booking' => $booking]);
    }

    public function exportPdf($id)
    {
        $userId = auth()->id() ?? request('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::with('user')->where('id', $id)->where('user_id', $userId)->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $serviceName = null;
        if ($booking->booking_type === 'tour') {
            $service = \App\Models\Tour::find($booking->target_id);
            $serviceName = $service ? $service->name : null;
        } elseif ($booking->booking_type === 'hotel') {
            $service = \App\Models\HotelRoom::with('hotel')->find($booking->target_id);
            $serviceName = $service ? ($service->hotel->name . ' - ' . $service->name) : null;
        } elseif ($booking->booking_type === 'restaurant') {
            $service = \App\Models\RestaurantTable::with('restaurant')->find($booking->target_id);
            $serviceName = $service ? ($service->restaurant->name . ' - ' . $service->name) : null;
        }

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', compact('booking', 'serviceName'));
        
        return $pdf->download("HoaDon_{$booking->id}.pdf");
    }

    public function verifyQRCode(Request $request)
    {
        try {
            $bookingId = $request->booking_id;
            
            // Tìm booking kèm theo thông tin user
            $booking = Booking::with('user')->find($bookingId);

            if (!$booking) {
                return response()->json(['success' => false, 'message' => 'Không tìm thấy booking này'], 404);
            }

            // Kiểm tra trạng thái thanh toán
            if ($booking->status !== 'paid') {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking này chưa thanh toán hoặc đã bị hủy. Trạng thái hiện tại: ' . $booking->status
                ], 400);
            }

            // Kiểm tra xem đã check-in chưa
            if ($booking->checked_in_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mã này đã được sử dụng check-in vào lúc ' . \Carbon\Carbon::parse($booking->checked_in_at)->format('H:i d/m/Y')
                ], 400);
            }

            // Đánh dấu check-in
            $now = now();
            $booking->checked_in_at = $now;
            $booking->status = 'confirmed';
            $booking->save();

            // Lấy thông tin chi tiết dịch vụ để hiển thị cho nhân viên
            $serviceName = "Dịch vụ #{$booking->target_id}";
            if ($booking->booking_type === 'tour') {
                $service = \App\Models\Tour::find($booking->target_id);
                $serviceName = $service ? $service->name : $serviceName;
            } elseif ($booking->booking_type === 'hotel') {
                $service = \App\Models\HotelRoom::with('hotel')->find($booking->target_id);
                $serviceName = $service ? ($service->hotel->name . ' - ' . $service->name) : $serviceName;
            } elseif ($booking->booking_type === 'restaurant') {
                $service = \App\Models\RestaurantTable::with('restaurant')->find($booking->target_id);
                $serviceName = $service ? ($service->restaurant->name . ' - ' . $service->name) : $serviceName;
            }

            return response()->json([
                'success' => true,
                'message' => 'Xác minh thành công! Khách hàng có thể sử dụng dịch vụ.',
                'data' => [
                    'booking_id' => $booking->id,
                    'customer_name' => $booking->user ? $booking->user->name : 'N/A',
                    'service_name' => $serviceName,
                    'quantity' => $booking->quantity,
                    'checked_in_at' => $now->format('H:i:s d/m/Y')
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }
}
