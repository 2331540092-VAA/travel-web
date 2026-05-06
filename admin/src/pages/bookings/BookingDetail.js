import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingById, updateBookingStatus, } from "../../services/BookingService";
import { ArrowLeft, ClipboardList, Save } from "lucide-react";
// Việt hóa các tùy chọn trạng thái
const statusOptions = [
    { value: "pending", label: "Đang chờ" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "cancelled", label: "Đã hủy" },
    { value: "completed", label: "Hoàn thành" },
    { value: "paid", label: "Đã thanh toán" },
];
const statusStyle = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-emerald-100 text-emerald-700",
    paid: "bg-blue-100 text-blue-700",
    completed: "bg-cyan-100 text-cyan-700",
    cancelled: "bg-red-100 text-red-700",
};
const BookingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [updating, setUpdating] = useState(false);
    useEffect(() => {
        if (id) {
            setLoading(true);
            getBookingById(Number(id))
                .then((res) => {
                setBooking(res);
                setStatus(res.status);
            })
                .finally(() => setLoading(false));
        }
    }, [id]);
    const handleStatusChange = async () => {
        if (!booking)
            return;
        setUpdating(true);
        try {
            await updateBookingStatus(booking.id, status);
            setBooking({ ...booking, status });
            alert("Cập nhật trạng thái thành công!");
        }
        catch (error) {
            alert("Cập nhật thất bại, vui lòng thử lại!");
        }
        finally {
            setUpdating(false);
        }
    };
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i th\u00F4ng tin..."] }));
    if (!booking)
        return (_jsx("div", { className: "text-center py-20 text-gray-400", children: "Kh\u00F4ng t\u00ECm th\u1EA5y th\u00F4ng tin \u0111\u01A1n \u0111\u1EB7t ch\u1ED7 n\u00E0y." }));
    const bookingTypeLabel = {
        hotel: "Khách sạn",
        tour: "Tour du lịch",
        restaurant: "Nhà hàng",
    };
    const serviceName = booking.booking_type === "tour"
        ? (booking.tour?.name || `Tour #${booking.target_id}`)
        : booking.booking_type === "hotel"
            ? [booking.hotel?.name, booking.hotel_room?.name].filter(Boolean).join(" — ") || `Khách sạn #${booking.target_id}`
            : booking.booking_type === "restaurant"
                ? [booking.restaurant?.name, booking.restaurant_table?.name].filter(Boolean).join(" — ") || `Nhà hàng #${booking.target_id}`
                : `Dịch vụ #${booking.target_id}`;
    const infoRows = [
        {
            label: "Khách hàng",
            value: booking.user?.name || `Người dùng #${booking.user_id}`,
        },
        { label: "Email liên hệ", value: booking.user?.email || "—" },
        {
            label: "Loại dịch vụ",
            value: (_jsx("span", { className: "text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-purple-100 text-purple-600", children: bookingTypeLabel[booking.booking_type] || booking.booking_type })),
        },
        { label: "Tên dịch vụ", value: serviceName },
        { label: "Mã dịch vụ (ID)", value: `#${booking.target_id}` },
        {
            label: booking.booking_type === "hotel" ? "Nhận phòng (Check In)"
                : booking.booking_type === "tour" ? "Ngày khởi hành"
                    : "Ngày đặt",
            value: booking.check_in
                ? new Date(booking.check_in).toLocaleDateString("vi-VN")
                : booking.booking_date
                    ? new Date(booking.booking_date).toLocaleDateString("vi-VN")
                    : "—",
        },
        ...(booking.booking_type === "hotel" || booking.booking_type === "tour"
            ? [{
                    label: booking.booking_type === "hotel" ? "Trả phòng (Check Out)" : "Ngày kết thúc",
                    value: booking.check_out
                        ? new Date(booking.check_out).toLocaleDateString("vi-VN")
                        : "—",
                }]
            : []),
        {
            label: "Thời gian đặt thực tế",
            value: booking.created_at
                ? new Date(booking.created_at).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
                : "—",
        },
        { label: "Số lượng đặt", value: `${booking.quantity} đơn vị` },
        {
            label: "Tổng tiền thanh toán",
            value: (_jsxs("span", { className: "text-lg font-bold text-emerald-600", children: [Number(booking.total_amount || 0).toLocaleString("vi-VN"), " VN\u0110"] })),
        },
        { label: "Hình thức thanh toán", value: booking.payment_type || "—" },
        { label: "Ghi chú từ khách", value: booking.note || "Không có" },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-3xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600", children: _jsx(ClipboardList, { size: 22 }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-xl font-bold text-gray-800", children: ["Chi ti\u1EBFt \u0111\u01A1n \u0111\u1EB7t #", booking.id] }), _jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [_jsx("span", { className: "text-xs text-gray-400", children: "Tr\u1EA1ng th\u00E1i:" }), _jsx("span", { className: `text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${statusStyle[booking.status] || "bg-gray-100 text-gray-600"}`, children: statusOptions.find((opt) => opt.value === booking.status)
                                                    ?.label || booking.status })] })] })] }), _jsxs("button", { onClick: () => navigate("/admin/bookings"), className: "flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors", children: [_jsx(ArrowLeft, { size: 16 }), "Quay l\u1EA1i danh s\u00E1ch"] })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "bg-gray-50/80 px-6 py-3 border-b border-gray-100", children: _jsx("h2", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Th\u00F4ng tin chi ti\u1EBFt \u0111\u01A1n h\u00E0ng" }) }), _jsx("div", { className: "divide-y divide-gray-50", children: infoRows.map((row, i) => (_jsxs("div", { className: "flex items-center px-6 py-4", children: [_jsx("span", { className: "w-48 text-sm text-gray-400 font-medium shrink-0", children: row.label }), _jsx("span", { className: "text-sm text-gray-800", children: row.value })] }, i))) })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "bg-gray-50/80 px-6 py-3 border-b border-gray-100", children: _jsx("h2", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "C\u1EADp nh\u1EADt tr\u1EA1ng th\u00E1i \u0111\u01A1n h\u00E0ng" }) }), _jsxs("div", { className: "px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [_jsx("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "w-full sm:w-52 bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: statusOptions.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) }), _jsxs("button", { onClick: handleStatusChange, disabled: updating || status === booking.status, className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed", children: [_jsx(Save, { size: 16 }), updating ? "Đang xử lý..." : "Lưu thay đổi"] })] })] })] }));
};
export default BookingDetail;
