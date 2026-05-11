<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Notification;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    private function bookingRelations(): array
    {
        return [
            'tour:id,name',
            'hotel:id,name',
            'restaurant:id,name',
            'hotelRoom:id,name',
            'restaurantTable:id,name',
        ];
    }

    private function loadCorrectRelation(Booking $booking): void
    {
        match ($booking->booking_type) {
            'tour'       => $booking->load('tour:id,name'),
            'hotel'      => $booking->load(['hotel:id,name', 'hotelRoom:id,name']),
            'restaurant' => $booking->load(['restaurant:id,name', 'restaurantTable:id,name']),
            default      => null,
        };
    }

    public function store(Request $request)
    {
        try {
            $userId = auth()->id() ?? $request->user_id;

            if (!$userId) {
                return response()->json(['message' => 'Unauthenticated', 'debug' => 'No user_id'], 401);
            }

            $payload = [
                'user_id' => $userId,
                'booking_type' => $request->booking_type,
                'target_id' => $request->target_id,
                'item_id' => $request->item_id,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'booking_date' => $request->booking_date,
                'quantity' => $request->quantity,
                'total_amount' => $request->total_amount,
                'payment_type' => 'full',
                'note' => $request->note,
            ];

            $existingPendingBooking = Booking::query()
                ->where('user_id', $userId)
                ->where('booking_type', $request->booking_type)
                ->where('target_id', $request->target_id)
                ->where('status', 'pending')
                ->when(
                    $request->filled('booking_date'),
                    fn ($query) => $query->whereDate('booking_date', $request->booking_date),
                    fn ($query) => $query->whereNull('booking_date')
                )
                ->latest('id')
                ->first();

            if ($existingPendingBooking) {
                $existingPendingBooking->fill($payload);
                $existingPendingBooking->status = 'pending';
                $existingPendingBooking->save();

                return response()->json(
                    $existingPendingBooking->load($this->bookingRelations())
                );
            }

            $booking = Booking::create($payload + [
                'status' => 'pending',
            ]);

            // Tạo notification cho user
            $bookingTypeLabel = match($request->booking_type) {
                'hotel' => 'Khách sạn',
                'restaurant' => 'Nhà hàng',
                'tour' => 'Tour',
                default => 'Dịch vụ'
            };

            Notification::createUserNotification(
                $userId,
                'booking_success',
                'Đặt ' . $bookingTypeLabel . ' thành công',
                'Booking #' . $booking->id . ' của bạn đã được tạo. Trạng thái hiện tại: chờ thanh toán.',
                ['booking_id' => $booking->id, 'booking_type' => $request->booking_type]
            );

            // Tạo notification cho admin
            $user = User::find($userId);
            Notification::createAdminNotification(
                'booking_new',
                'Có booking ' . $bookingTypeLabel . ' mới',
                'Khách hàng ' . ($user?->name ?? 'N/A') . ' vừa đặt ' . $bookingTypeLabel . ' (Booking #' . $booking->id . ')',
                ['booking_id' => $booking->id, 'user_id' => $userId, 'booking_type' => $request->booking_type]
            );

            return response()->json($booking->load($this->bookingRelations()));
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

        $bookings = Booking::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();

        $bookings->each(fn ($b) => $this->loadCorrectRelation($b));

        return response()->json($bookings);
    }

    public function show($id)
    {
        $userId = auth()->id() ?? request('user_id');
        
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $this->loadCorrectRelation($booking);

        return response()->json($booking);
    }

    public function cancel($id)
    {
        $userId = auth()->id() ?? request('user_id');
        
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::with($this->bookingRelations())
            ->where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        if ($booking->status === 'cancelled') {
            return response()->json(['message' => 'Booking đã hủy'], 400);
        }

        // Cho phép hủy cả booking đã thanh toán (user yêu cầu hủy có lý do)
        $cancelReason = request('cancel_reason', '');

        $booking->update(['status' => 'cancelled']);

        $userMessage = 'Booking của bạn đã được hủy thành công.';
        if ($cancelReason) {
            $userMessage .= ' Lý do: ' . $cancelReason;
        }

        // Tạo notification cho user
        Notification::createUserNotification(
            $userId,
            'booking_cancelled',
            'Booking #' . $booking->id . ' đã bị hủy',
            $userMessage,
            ['booking_id' => $booking->id, 'booking_type' => $booking->booking_type, 'cancel_reason' => $cancelReason]
        );

        // Tạo notification cho admin
        $user = User::find($userId);
        $adminMessage = 'Khách hàng ' . ($user?->name ?? 'N/A') . ' vừa hủy booking';
        if ($cancelReason) {
            $adminMessage .= '. Lý do: ' . $cancelReason;
        }
        Notification::createAdminNotification(
            'booking_cancelled',
            'Booking #' . $booking->id . ' bị hủy',
            $adminMessage,
            ['booking_id' => $booking->id, 'user_id' => $userId, 'cancel_reason' => $cancelReason]
        );

        return response()->json([
            'message' => 'Đã hủy booking',
            'booking' => $booking->fresh()->load($this->bookingRelations()),
        ]);
    }

    public function downloadPdf($id)
    {
        $userId = auth()->id() ?? request('user_id');

        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $booking = Booking::with([
            'tour:id,name',
            'hotel:id,name',
            'restaurant:id,name',
            'user:id,name,email',
        ])
            ->where('id', $id)
            ->where('user_id', $userId)
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $user = $booking->user ?? User::find($userId);

        $serviceName = $booking->tour?->name
            ?? $booking->hotel?->name
            ?? $booking->restaurant?->name
            ?? "Dịch vụ #{$booking->target_id}";

        $pdf = Pdf::loadView('pdf.invoice', compact('booking', 'user', 'serviceName'))
            ->setPaper('a4', 'portrait');

        return $pdf->download("HoaDon_{$booking->id}.pdf");
    }
}