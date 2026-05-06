import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../service/api";
import toast from "react-hot-toast";

interface Booking {
  id: number;
  booking_type: 'tour' | 'hotel' | 'restaurant';
  target_id: number;
  quantity?: number;
  total_amount?: number;
  status: string;
  created_at: string;
  tour?: { id: number; name: string };
  hotel?: { id: number; name: string };
  restaurant?: { id: number; name: string };
  service_name?: string;
  title?: string;
  item_name?: string;
  people?: number;
}

const CANCEL_REASONS = [
  "Thay đổi kế hoạch cá nhân",
  "Tìm được dịch vụ tốt hơn",
  "Lý do sức khỏe / bất khả kháng",
  "Công việc đột xuất",
  "Điều kiện thời tiết không thuận lợi",
  "Đặt nhầm / sai thông tin",
  "Lý do khác",
];

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [cancelModal, setCancelModal] = useState<{ bookingId: number } | null>(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

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

  const openCancelModal = (bookingId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedReason("");
    setCustomReason("");
    setCancelModal({ bookingId });
  };

  const handleCancel = async () => {
    if (!cancelModal) return;
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
      await apiPost(`/bookings/${cancelModal.bookingId}/cancel?user_id=${user.id}`, { cancel_reason: reason });
      setBookings((prev) =>
        prev.map((b) => b.id === cancelModal.bookingId ? { ...b, status: "cancelled" } : b)
      );
      toast.success("Đã hủy booking thành công");
      setCancelModal(null);
      window.dispatchEvent(new Event("notification:refresh"));
    } catch (err: any) {
      toast.error("Lỗi: " + (err?.message || "Không xác định"));
    } finally {
      setCancelling(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(stored);
    apiGet<Booking[] | { data: Booking[] }>(`/my-bookings?user_id=${user.id}`)
      .then((data) => {
        console.log("[BookingHistory] API response:", data);
        setBookings(Array.isArray(data) ? data : (data as { data: Booking[] }).data ?? []);
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / pageSize);
  const pagedBookings = bookings.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt của bạn</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">Bạn chưa có đặt chỗ nào.</p>
      ) : (
        <>
          <div className="space-y-4">
            {pagedBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 bg-white border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {b.booking_type === 'tour'
                      ? (b.tour?.name || 'Tour du lịch')
                      : b.booking_type === 'hotel'
                        ? (b.hotel?.name || 'Khách sạn')
                        : b.booking_type === 'restaurant'
                          ? (b.restaurant?.name || 'Nhà hàng')
                          : (b.service_name || b.title || b.item_name || b.booking_type)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(b.created_at).toLocaleString('vi-VN', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Số lượng: {b.quantity ?? b.people ?? "-"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {b.total_amount
                      ? Number(b.total_amount).toLocaleString() + " VND"
                      : "-"}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${statusColors[b.status] || "bg-gray-100"}`}
                  >
                    {statusLabels[b.status] || b.status}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/bookings/${b.id}`)}
                      className="flex-1 px-3 py-1 border rounded text-sm hover:bg-blue-50"
                    >
                      Xem chi tiết
                    </button>
                    {(b.status === "pending" || b.status === "paid") && (
                      <button
                        onClick={(e) => openCancelModal(b.id, e)}
                        className="flex-1 px-3 py-1 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50"
                      >
                        Hủy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded border ${page === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
              >
                &lt;
              </button>
              <span className="px-2 text-sm font-semibold">
                Trang {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded border ${page === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"}`}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}

      {/* Cancel Reason Modal */}
      {cancelModal && (
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
                onClick={() => setCancelModal(null)}
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
