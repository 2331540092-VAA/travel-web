<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Lấy notifications cho user hoặc admin
     */
    public function index(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        $isAdmin = $request->header('X-Admin') === 'true' || $request->input('is_admin') === 'true';

        if (!$userId && !$isAdmin) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Notification::query();

        if ($isAdmin) {
            // Admin xem notification cho admin (user_id = null)
            $query->whereNull('user_id');
        } else {
            // User xem notification của mình
            $query->where('user_id', $userId);
        }

        $notifications = $query
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        $unreadCount = $query
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count'  => $unreadCount,
        ]);
    }

    /**
     * Lấy số notification chưa đọc
     */
    public function unreadCount(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        $isAdmin = $request->header('X-Admin') === 'true' || $request->input('is_admin') === 'true';

        if (!$userId && !$isAdmin) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Notification::where('is_read', false);

        if ($isAdmin) {
            $query->whereNull('user_id');
        } else {
            $query->where('user_id', $userId);
        }

        $count = $query->count();

        return response()->json(['unread_count' => $count]);
    }

    /**
     * Đánh dấu đã đọc
     */
    public function markRead($id)
    {
        $userId = auth()->id() ?? request('user_id');
        $isAdmin = request()->header('X-Admin') === 'true' || request('is_admin') === 'true';

        if (!$userId && !$isAdmin) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        // Kiểm tra quyền: user chỉ có thể đánh dấu notification của mình, admin xem notification admin
        if (!$isAdmin && $notification->user_id !== $userId) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'OK']);
    }

    /**
     * Đánh dấu tất cả đã đọc
     */
    public function markAllRead(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        $isAdmin = $request->header('X-Admin') === 'true' || $request->input('is_admin') === 'true';

        if (!$userId && !$isAdmin) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $query = Notification::where('is_read', false);

        if ($isAdmin) {
            $query->whereNull('user_id');
        } else {
            $query->where('user_id', $userId);
        }

        $query->update(['is_read' => true]);

        return response()->json(['message' => 'All marked as read']);
    }
}
