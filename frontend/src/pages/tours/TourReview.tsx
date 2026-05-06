import { useState, useEffect } from "react";
import { MessageSquare, Send, AlertCircle, Loader2, User } from "lucide-react";
import { apiGet, apiPost } from "../../service/api";

interface Review {
  id: number;
  comment: string;
  rating: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
}

interface TourReviewProps {
  tourId: number;
}

export default function TourReview({ tourId }: TourReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  // Auth check: dùng session cookie (Sanctum) — không cần localStorage token
  const storedUser = localStorage.getItem("user");
  const isLoggedIn = !!storedUser;

  const loadReviews = async () => {
    try {
      const data = await apiGet<any>(`/reviews?type=tour&id=${tourId}`);
      setReviews(data.data || data);
    } catch (error) {
      console.error("Lỗi tải bình luận:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [tourId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      await apiPost("/reviews", {
        type: "tour",
        id: tourId,
        comment,
        rating: 5,
      });
      setComment("");
      loadReviews();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : '';
      if (errMsg.includes("401")) {
        setServerError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
      } else if (errMsg.includes("403")) {
        setServerError("Bạn cần hoàn thành tour để có thể bình luận.");
      } else {
        setServerError(errMsg || "Không thể gửi bình luận.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center p-5">
        <Loader2 className="animate-spin mx-auto" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 border-t pt-10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-emerald-600" />
        <h3 className="text-2xl font-bold">Bình luận ({reviews.length})</h3>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-6 mb-10">
        {reviews.map((item) => (
          <div key={item.id} className="flex gap-4 border-b pb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0 overflow-hidden">
              {item.user.avatar_url ? (
                <img src={item.user.avatar_url} alt={item.user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={18} />
              )}
            </div>
            <div>
              <h4 className="font-bold">{item.user.name}</h4>
              <p className="text-gray-600 text-sm">{item.comment}</p>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-gray-400 text-center py-4">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
        )}
      </div>

      {/* Form viết bình luận */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-emerald-500"
            placeholder="Viết bình luận..."
            rows={3}
          />
          {serverError && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle size={14} /> {serverError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Send size={18} /> Gửi bình luận
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
          Vui lòng{" "}
          <a href="/login" className="underline font-bold">
            đăng nhập
          </a>{" "}
          để tham gia bình luận.
        </div>
      )}
    </div>
  );
}
