import { useState, useEffect, useRef } from "react";
import { Bell, Search, User, MapPin, Hotel, Calendar } from "lucide-react";
import DashboardService from "../services/DashboardService";

const AdminHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await DashboardService.getStats();
        if (data && data.recent_bookings) {
          setNotifications(data.recent_bookings);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMs / 3600000);
      const diffDays = Math.round(diffMs / 86400000);

      if (diffMins < 60) return `${diffMins} phút trước`;
      if (diffHours < 24) return `${diffHours} giờ trước`;
      return `${diffDays} ngày trước`;
    } catch {
      return dateString;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
      {/* Search */}
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600/20 text-sm outline-none transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg relative transition-colors"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 text-sm">
                  Thông báo mới
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                  {notifications.length}
                </span>
              </div>

              <div className="max-h-[360px] overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((notif: any) => (
                      <div
                        key={notif.id}
                        className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                          {notif.booking_type === "tour" ? (
                            <MapPin size={18} />
                          ) : (
                            <Hotel size={18} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            Đơn đặt{" "}
                            {notif.booking_type === "tour"
                              ? "Tour"
                              : "Khách sạn"}{" "}
                            mới
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            Khách hàng{" "}
                            <span className="font-medium text-gray-700">
                              {notif.user?.name || "Khách vãng lai"}
                            </span>{" "}
                            vừa đặt đơn trị giá{" "}
                            <span className="text-orange-500 font-bold">
                              {parseInt(notif.total_amount).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </span>
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1">
                            <Calendar size={10} />
                            {formatDate(notif.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center">
                    <Bell size={24} className="text-gray-300 mb-2" />
                    <p className="text-sm">Không có thông báo mới.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

        {/* Admin User */}
        <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Quản trị viên</p>
          </div>
          <div className="w-9 h-9 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 border border-blue-600/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
