import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { apiGet, apiPost, API_BASE } from "../../service/api";
import toast from "react-hot-toast";

interface Booking {
  id: number;
  user_id: number;
  booking_type: string;
  target_id: number;
  check_in?: string;
  check_out?: string;
  booking_date: string;
  quantity: number;
  total_amount: number;
  payment_type?: string;
  status: string;
  note?: string;
  created_at: string;
  tour?: { name: string };
  hotel?: { name: string };
  restaurant?: { name: string };
  hotel_room?: { name: string };
  restaurant_table?: { name: string };
  item_name?: string;
  title?: string;
}

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const CANCEL_REASONS = [
    "Thay đổi kế hoạch cá nhân",
    "Tìm được dịch vụ tốt hơn",
    "Lý do sức khỏe / bất khả kháng",
    "Công việc đột xuất",
    "Điều kiện thời tiết không thuận lợi",
    "Đặt nhầm / sai thông tin",
    "Lý do khác",
  ];

  const formatDateTime = (value?: string) => {
    if (!value) return "-";

    return new Date(value).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    apiGet<{ data?: Booking } & Booking>(`/bookings/${id}?user_id=${user.id}`)
      .then((data) => setBooking(data.data ?? data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePayment = () => {
    if (!booking) return;

    const params = new URLSearchParams({
      bookingId: String(booking.id),
      price: String(booking.total_amount || 0),
      people: String(booking.quantity || 1),
      date: String(booking.booking_date || ""),
    });

    if (booking.booking_type === "tour") {
      params.set("tourId", String(booking.target_id || ""));
    } else {
      params.set("serviceType", String(booking.booking_type || ""));
      params.set("serviceId", String(booking.target_id || ""));
    }

    navigate(`/payment?${params.toString()}`);
  };

  const handleCancel = async () => {
    const reason = selectedReason === "Lý do khác"
      ? (customReason.trim() || "Lý do khác")
      : selectedReason;

    if (!reason) {
      toast.error("Vui lòng chọn lý do hủy");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      setCancelling(true);
      const data = await apiPost<{ booking?: Booking } & Booking>(
        `/bookings/${id}/cancel?user_id=${user.id}`,
        { cancel_reason: reason },
      );
      toast.success("Đã hủy booking thành công");
      setBooking(data.booking ?? data);
      setShowCancelModal(false);
      window.dispatchEvent(new Event("notification:refresh"));
    } catch (error) {
      toast.error("Lỗi: " + (error instanceof Error ? error.message : "Không xác định"));
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!booking)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Không tìm thấy booking</p>
        <button
          onClick={() => navigate("/bookings")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Quay lại
        </button>
      </div>
    );

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    paid: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Chờ thanh toán",
    confirmed: "Đã xác nhận",
    paid: "Đã thanh toán",
    cancelled: "Đã hủy",
  };

  const serviceName =
    booking.booking_type === 'tour'
      ? (booking.tour?.name || 'Tour du lịch')
      : booking.booking_type === 'hotel'
        ? (booking.hotel?.name || 'Khách sạn')
        : booking.booking_type === 'restaurant'
          ? (booking.restaurant?.name || 'Nhà hàng')
          : (booking.item_name || booking.title || `Dịch vụ #${booking.target_id}`);

  const itemName =
    booking.booking_type === 'hotel'
      ? (booking.hotel_room?.name || '')
      : booking.booking_type === 'restaurant'
        ? (booking.restaurant_table?.name || '')
        : '';

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chi tiết booking
        </h1>
        <p className="text-gray-600">ID: {booking.id}</p>
        <p className="text-sm text-gray-500 mt-1">
          Thời gian đặt thực tế: {formatDateTime(booking.created_at)}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              statusColors[booking.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {statusLabels[booking.status] || booking.status}
          </span>
        </div>

        {/* Info Grid - Changed to Boarding Pass / E-Ticket style for paid bookings */}
        {booking.status === "paid" ? (
          <div className="mb-8 border-2 border-dashed border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-center border-b border-blue-100 pb-4">
                <h3 className="text-2xl font-black text-blue-900 uppercase tracking-widest">
                  E-Ticket
                </h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {booking.booking_type}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Tên dịch vụ
                </p>
                <p className="text-lg font-bold text-gray-800">{serviceName}</p>
                {itemName && (
                  <p className="text-sm text-blue-600 font-semibold mt-0.5">{itemName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Khách Hàng
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {JSON.parse(localStorage.getItem("user") || "{}").name ||
                      "Quý khách"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Mã Đặt Chỗ
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    #{booking.id}
                  </p>
                </div>

                {/* Tour / Hotel: hiển thị check-in → check-out */}
                {(booking.booking_type === "tour" || booking.booking_type === "hotel") && booking.check_in ? (
                  <>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        {booking.booking_type === "hotel" ? "Nhận Phòng" : "Ngày Đi"}
                      </p>
                      <p className="font-bold text-gray-800">
                        {new Date(booking.check_in).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        {booking.booking_type === "hotel" ? "Trả Phòng" : "Ngày Về"}
                      </p>
                      <p className="font-bold text-gray-800">
                        {booking.check_out
                          ? new Date(booking.check_out).toLocaleDateString("vi-VN")
                          : "—"}
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Lịch Trình
                    </p>
                    <p className="font-bold text-gray-800">
                      {booking.check_in
                        ? new Date(booking.check_in).toLocaleDateString("vi-VN")
                        : new Date(booking.booking_date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Số Lượng
                  </p>
                  <p className="font-bold text-gray-800">
                    {booking.quantity} người
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block border-l-2 border-dashed border-blue-200 h-40 mx-2"></div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md border border-gray-100 min-w-[200px]">
              <QRCodeCanvas
                value={JSON.stringify({
                  booking_id: booking.id,
                  target: booking.target_id,
                  type: booking.booking_type,
                })}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
              <p className="text-[10px] text-gray-500 mt-3 font-mono tracking-widest">
                SCAN TO CHECK IN
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Tên dịch vụ</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {serviceName}
                </p>
                {itemName && (
                  <p className="text-sm text-blue-600 font-medium mt-0.5">{itemName}</p>
                )}
              </div>

              <div>
                <p className="text-gray-600 text-sm">Loại đặt</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {booking.booking_type}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Ngày lịch trình</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.check_in
                    ? new Date(booking.check_in).toLocaleDateString("vi-VN")
                    : new Date(booking.booking_date).toLocaleDateString(
                        "vi-VN",
                      )}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Số lượng</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.quantity || 1}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Mã dịch vụ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {booking.target_id}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Thời gian tạo HĐ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatDateTime(booking.created_at)}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Ngày sử dụng dịch vụ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatDateTime(booking.booking_date)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Total Amount */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Tổng tiền:</span>
            <span className="text-3xl font-bold text-blue-600">
              {booking.total_amount
                ? Number(booking.total_amount).toLocaleString()
                : "0"}{" "}
              VND
            </span>
          </div>
        </div>

        {/* Note */}
        {booking.note && (
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-2">Ghi chú</p>
            <p className="text-gray-700 bg-gray-50 p-4 rounded">
              {booking.note}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          {booking.status === "pending" && (
            <>
              <button
                onClick={handlePayment}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                💳 Thanh toán ngay
              </button>

              <button
                onClick={() => {
                  setSelectedReason("");
                  setCustomReason("");
                  setShowCancelModal(true);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
              >
                ❌ Hủy booking
              </button>
            </>
          )}

          {booking.status === "cancelled" && (
            <div className="flex-1 bg-red-50 text-red-700 font-semibold py-3 rounded-lg text-center flex items-center justify-center">
              ⛔ Booking đã bị hủy
            </div>
          )}

          {booking.status === "paid" && (
            <button
              onClick={() => {
                setSelectedReason("");
                setCustomReason("");
                setShowCancelModal(true);
              }}
              className="flex-1 border border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition"
            >
              ❌ Yêu cầu hủy booking
            </button>
          )}

          {booking.status === "paid" && (
            <button
              onClick={async () => {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                try {
                  toast.loading("Đang tạo hóa đơn PDF...", { id: "pdf" });
                  const response = await fetch(
                    `${API_BASE}/bookings/${booking.id}/pdf?user_id=${user.id}`,
                    {
                      method: "GET",
                      credentials: "include",
                    },
                  );
                  if (!response.ok) throw new Error("Không thể tải hóa đơn");

                  const blob = await response.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `HoaDon_${booking.id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);

                  toast.success("Tải hóa đơn thành công!", { id: "pdf" });
                } catch {
                  toast.error(
                    "Lỗi hệ thống khi tải PDF. Vui lòng thử lại sau.",
                    { id: "pdf" },
                  );
                }
              }}
              className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white shadow-md font-semibold flex items-center justify-center gap-2 py-3 rounded-lg transition"
            >
              <span>📄</span> Tải Hóa Đơn PDF
            </button>
          )}

          <button
            onClick={() => navigate("/bookings")}
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition"
          >
            Quay lại
          </button>
        </div>
      </div>

      {/* Cancel Reason Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Lý do hủy booking</h2>
            <p className="text-sm text-gray-500 mb-5">Vui lòng chọn lý do để giúp chúng tôi cải thiện dịch vụ.</p>

            <div className="space-y-3 mb-5">
              {CANCEL_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    selectedReason === reason
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="accent-red-500"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            {selectedReason === "Lý do khác" && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Nhập lý do cụ thể của bạn..."
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 mb-4 resize-none"
              />
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition"
                disabled={cancelling}
              >
                Đóng
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling || !selectedReason || (selectedReason === "Lý do khác" && !customReason.trim())}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold py-3 rounded-xl transition"
              >
                {cancelling ? "Đang xử lý..." : "Xác nhận hủy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
