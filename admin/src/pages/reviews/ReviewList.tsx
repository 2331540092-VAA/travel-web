import { useEffect, useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, Filter } from "lucide-react";
import {
  getReviews,
  approveReview,
  rejectReview,
  deleteReview,
  Review,
} from "../../services/ReviewService";

const typeLabels: Record<string, string> = {
  tour: "Tour",
  hotel: "Khách sạn",
  restaurant: "Nhà hàng",
};

const typeBadgeColor: Record<string, string> = {
  tour: "bg-orange-100 text-orange-700",
  hotel: "bg-emerald-100 text-emerald-700",
  restaurant: "bg-rose-100 text-rose-700",
};

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviews(filter || undefined);
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const handleApprove = async (id: number) => {
    await approveReview(id);
    fetchReviews();
  };

  const handleReject = async (id: number) => {
    await rejectReview(id);
    fetchReviews();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa review này?")) return;
    await deleteReview(id);
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý đánh giá</h1>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Tất cả</option>
            <option value="tour">Tour</option>
            <option value="hotel">Khách sạn</option>
            <option value="restaurant">Nhà hàng</option>
          </select>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          Chưa có đánh giá nào
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Người dùng</th>
                <th className="px-4 py-3 text-left">Loại</th>
                <th className="px-4 py-3 text-left">Dịch vụ</th>
                <th className="px-4 py-3 text-center">Đánh giá</th>
                <th className="px-4 py-3 text-left">Bình luận</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Ngày</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {r.user?.avatar_url ? (
                        <img
                          src={r.user.avatar_url}
                          className="w-8 h-8 rounded-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs">
                          {r.user?.name?.charAt(0) || "?"}
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {r.user?.name || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${typeBadgeColor[r.entity_type || ""] || "bg-gray-100 text-gray-600"}`}
                    >
                      {typeLabels[r.entity_type || ""] || r.entity_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">
                    {r.entity_name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-0.5">
                      {renderStars(r.rating)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[250px] truncate">
                    {r.comment || <span className="italic text-gray-400">Không có</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {r.is_approved ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Đã duyệt
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Chờ duyệt
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500">
                    {new Date(r.created_at).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1">
                      {!r.is_approved && (
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition"
                          title="Duyệt"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {r.is_approved && (
                        <button
                          onClick={() => handleReject(r.id)}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600 transition"
                          title="Từ chối"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
