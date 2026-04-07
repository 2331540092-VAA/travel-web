import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Booking,
  getBookingById,
  updateBookingStatus,
} from "../../services/BookingService";
import { ArrowLeft, ClipboardList, Save } from "lucide-react";

const statusOptions = ["pending", "confirmed", "cancelled", "completed", "paid"];

const statusStyle: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  paid: "bg-blue-100 text-blue-700",
  completed: "bg-cyan-100 text-cyan-700",
  cancelled: "bg-red-100 text-red-700",
};

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
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
    if (!booking) return;
    setUpdating(true);
    await updateBookingStatus(booking.id, status);
    setBooking({ ...booking, status });
    setUpdating(false);
    alert("Cập nhật trạng thái thành công!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!booking)
    return (
      <div className="text-center py-20 text-gray-400">
        Không tìm thấy booking
      </div>
    );

  const bookingTypeLabel: Record<string, string> = {
    hotel: "Khách sạn",
    tour: "Tour",
    restaurant: "Nhà hàng",
  };

  const infoRows = [
    { label: "Khách hàng", value: booking.user?.name || `User #${booking.user_id}` },
    { label: "Email", value: booking.user?.email || "—" },
    { label: "Loại đặt", value: (
      <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-purple-100 text-purple-600">
        {bookingTypeLabel[booking.booking_type] || booking.booking_type}
      </span>
    )},
    { label: "Mã đối tượng", value: `#${booking.target_id}` },
    { label: "Check In", value: booking.check_in ? new Date(booking.check_in).toLocaleDateString("vi-VN") : "—" },
    { label: "Check Out", value: booking.check_out ? new Date(booking.check_out).toLocaleDateString("vi-VN") : "—" },
    { label: "Ngày đặt", value: booking.booking_date ? new Date(booking.booking_date).toLocaleDateString("vi-VN") : "—" },
    { label: "Số lượng", value: booking.quantity },
    { label: "Tổng tiền", value: (
      <span className="text-lg font-bold text-emerald-600">
        {Number(booking.total_amount || 0).toLocaleString("vi-VN")} VNĐ
      </span>
    )},
    { label: "Thanh toán", value: booking.payment_type || "—" },
    { label: "Ghi chú", value: booking.note || "—" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Chi tiết Booking #{booking.id}
            </h1>
            <p className="text-xs text-gray-400">
              Trạng thái hiện tại:{" "}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${statusStyle[booking.status] || "bg-gray-100 text-gray-600"}`}>
                {booking.status}
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50/80 px-6 py-3 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Thông tin đơn đặt
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {infoRows.map((row, i) => (
            <div key={i} className="flex items-center px-6 py-3.5">
              <span className="w-40 text-sm text-gray-400 font-medium shrink-0">
                {row.label}
              </span>
              <span className="text-sm text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Update Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50/80 px-6 py-3 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Cập nhật trạng thái
          </h2>
        </div>
        <div className="px-6 py-5 flex items-center gap-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-w-[180px]"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handleStatusChange}
            disabled={updating || status === booking.status}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {updating ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
