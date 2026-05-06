import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../../service/api";
import { Trash2 } from "lucide-react";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  is_read: boolean;
  created_at: string;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const getCurrentUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      return user?.id ? Number(user.id) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      const data = await apiGet(`/notifications?user_id=${userId}`);
      setNotifications((data as any).notifications || []);
      setUnreadCount((data as any).unread_count || 0);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const userId = getCurrentUserId();
      if (!userId) return;

      await apiPatch(`/notifications/${id}/read`, { user_id: userId });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const userId = getCurrentUserId();
      if (!userId) return;

      await apiPatch("/notifications/read-all", { user_id: userId });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking_success":
        return "bg-green-50 border-l-4 border-green-500";
      case "booking_cancelled":
        return "bg-red-50 border-l-4 border-red-500";
      case "booking_new":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "payment_success":
        return "bg-blue-50 border-l-4 border-blue-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-500";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking_success":
        return "✅";
      case "booking_cancelled":
        return "❌";
      case "booking_new":
        return "🔔";
      case "payment_success":
        return "💳";
      default:
        return "📌";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Thông báo</h1>
        <p className="text-gray-600">
          {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : "Không có thông báo mới"}
        </p>
      </div>

      {unreadCount > 0 && (
        <button
          onClick={handleMarkAllAsRead}
          className="mb-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đánh dấu tất cả đã đọc
        </button>
      )}

      {notifications.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Không có thông báo nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${getNotificationColor(notification.type)} ${
                !notification.is_read ? "opacity-100" : "opacity-75"
              } transition cursor-pointer hover:shadow-md`}
              onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {notification.title}
                      {!notification.is_read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
