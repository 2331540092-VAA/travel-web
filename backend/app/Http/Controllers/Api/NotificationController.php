<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Lấy notifications cho user
     */
    public function index(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $notifications = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        $unreadCount = Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count'  => $unreadCount,
        ]);
    }

    /**
     * Đánh dấu đã đọc
     */
    public function markRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'OK']);
    }

    /**
     * Đánh dấu tất cả đã đọc
     */
    public function markAllRead(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All marked as read']);
    }
}
