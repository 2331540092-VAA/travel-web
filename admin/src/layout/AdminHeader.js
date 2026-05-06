import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Bell, User, Calendar, Check } from "lucide-react";
const API_URL = "http://localhost:8000/api/admin/notifications";
const AdminHeader = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const fetchNotifications = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setNotifications(data.notifications || []);
            setUnreadCount(data.unread_count || 0);
        }
        catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 15000); // Poll every 15s
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            clearInterval(interval);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleMarkAllRead = async () => {
        try {
            await fetch(`${API_URL}/read-all`, { method: "PATCH" });
            setUnreadCount(0);
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        }
        catch { }
    };
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.round(diffMs / 60000);
            const diffHours = Math.round(diffMs / 3600000);
            const diffDays = Math.round(diffMs / 86400000);
            if (diffMins < 60)
                return `${diffMins} phút trước`;
            if (diffHours < 24)
                return `${diffHours} giờ trước`;
            return `${diffDays} ngày trước`;
        }
        catch {
            return dateString;
        }
    };
    return (_jsxs("header", { className: "h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0", children: [_jsx("div", { className: "relative w-96" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsxs("button", { onClick: () => setShowNotifications(!showNotifications), className: "p-2 text-gray-500 hover:bg-gray-50 rounded-lg relative transition-colors", children: [_jsx(Bell, { size: 20 }), unreadCount > 0 && (_jsx("span", { className: "absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-red-500 rounded-full border-2 border-white text-[10px] font-bold text-white flex items-center justify-center px-1", children: unreadCount > 99 ? "99+" : unreadCount }))] }), showNotifications && (_jsxs("div", { className: "absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50", children: [_jsxs("div", { className: "px-4 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between", children: [_jsx("h3", { className: "font-bold text-gray-800 text-sm", children: "Th\u00F4ng b\u00E1o" }), _jsxs("div", { className: "flex items-center gap-2", children: [unreadCount > 0 && (_jsxs("button", { onClick: handleMarkAllRead, className: "text-[11px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1", children: [_jsx(Check, { size: 12 }), " \u0110\u1ECDc t\u1EA5t c\u1EA3"] })), _jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600", children: unreadCount })] })] }), _jsx("div", { className: "max-h-90 overflow-y-auto", children: notifications.length > 0 ? (_jsx("div", { className: "divide-y divide-gray-50", children: notifications.map((notif) => (_jsxs("div", { className: `p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notif.is_read ? "bg-blue-50/40" : ""}`, children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!notif.is_read
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-gray-100 text-gray-500"}`, children: _jsx(Bell, { size: 18 }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-semibold text-gray-800 truncate", children: notif.title }), _jsx("p", { className: "text-xs text-gray-500 mt-1 line-clamp-2", children: notif.message }), _jsxs("p", { className: "text-[10px] text-gray-400 mt-2 font-medium flex items-center gap-1", children: [_jsx(Calendar, { size: 10 }), formatDate(notif.created_at)] })] }), !notif.is_read && (_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" }))] }, notif.id))) })) : (_jsxs("div", { className: "p-8 text-center text-gray-500 flex flex-col items-center justify-center", children: [_jsx(Bell, { size: 24, className: "text-gray-300 mb-2" }), _jsx("p", { className: "text-sm", children: "Kh\u00F4ng c\u00F3 th\u00F4ng b\u00E1o m\u1EDBi." })] })) })] }))] }), _jsx("div", { className: "h-8 w-px bg-gray-100 mx-2" }), _jsxs("div", { className: "flex items-center gap-3 cursor-pointer p-1 hover:bg-gray-50 rounded-lg transition-colors", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-semibold text-gray-800", children: "Admin" }), _jsx("p", { className: "text-xs text-gray-500", children: "Qu\u1EA3n tr\u1ECB vi\u00EAn" })] }), _jsx("div", { className: "w-9 h-9 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 border border-blue-600/20", children: _jsx(User, { size: 20 }) })] })] })] }));
};
export default AdminHeader;
