import { useState } from "react";
import { Star, Send } from "lucide-react";
import { apiPost } from "../../service/api";
import toast from "react-hot-toast";

interface ReviewFormProps {
  type: "tour" | "hotel" | "restaurant";
  entityId: number;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({
  type,
  entityId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }

    setSubmitting(true);
    try {
      await apiPost("/reviews", {
        type,
        id: entityId,
        rating,
        comment: comment.trim() || null,
        user_id: user.id,
      });
      toast.success("Đánh giá thành công!");
      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (err: any) {
      toast.error(err.message || "Lỗi khi gửi đánh giá");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Viết đánh giá</h3>

      {/* Star selector */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-sm text-gray-600 mr-2">Đánh giá:</span>
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i + 1)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={28}
              className={
                i < (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm font-medium text-gray-600">
            {rating === 5
              ? "Tuyệt vời"
              : rating === 4
                ? "Rất tốt"
                : rating === 3
                  ? "Tốt"
                  : rating === 2
                    ? "Trung bình"
                    : "Kém"}
          </span>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        rows={3}
        maxLength={1000}
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-400">{comment.length}/1000</span>
        <button
          type="submit"
          disabled={submitting || rating === 0}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Send size={16} />
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </form>
  );
}
