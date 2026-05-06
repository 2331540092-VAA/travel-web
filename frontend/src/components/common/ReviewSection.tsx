import { useEffect, useState } from "react";
import { apiGet } from "../../service/api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import StarRating from "./StarRating";

interface ReviewSectionProps {
  type: "tour" | "hotel" | "restaurant";
  entityId: number;
  rating?: number;
  reviewsCount?: number;
}

export default function ReviewSection({
  type,
  entityId,
  rating,
  reviewsCount,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [canReview, setCanReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const result = await apiGet<any>(`/reviews?type=${type}&id=${entityId}`);
      const list = Array.isArray(result) ? result : (result?.data ?? []);
      setReviews(list);
    } catch (err) {
      console.error(err);
    }
  };

  const checkCanReview = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      setCanReview(false);
      return;
    }
    try {
      const data = await apiGet<any>(
        `/reviews/can-review?type=${type}&id=${entityId}&user_id=${user.id}`
      );
      setCanReview(data.can_review);
      setHasReviewed(data.has_reviewed || false);
    } catch {
      setCanReview(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchReviews(), checkCanReview()]).finally(() =>
      setLoading(false)
    );
  }, [type, entityId]);

  const handleReviewSubmitted = () => {
    fetchReviews();
    setHasReviewed(true);
  };

  if (loading) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Đánh giá & Nhận xét</h2>
        {(rating ?? 0) > 0 && (
          <StarRating
            rating={rating ?? 0}
            size={20}
            showText
            reviewsCount={reviewsCount}
          />
        )}
      </div>

      {/* Review form */}
      {canReview && !hasReviewed && (
        <div className="mb-6">
          <ReviewForm
            type={type}
            entityId={entityId}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
      )}

      {canReview && hasReviewed && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
          Bạn đã đánh giá dịch vụ này. Cảm ơn bạn!
        </div>
      )}

      {!canReview && (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-500">
          Chỉ khách hàng đã sử dụng dịch vụ mới có thể đánh giá.
        </div>
      )}

      {/* Review list */}
      <ReviewList reviews={reviews} />
    </div>
  );
}
