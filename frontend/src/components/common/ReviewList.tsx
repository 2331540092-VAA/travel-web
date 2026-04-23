import { Star } from "lucide-react";

interface ReviewItem {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  user?: { id: number; name: string; avatar_url: string | null };
}

interface ReviewListProps {
  reviews: ReviewItem[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        Chưa có đánh giá nào
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div
          key={r.id}
          className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition"
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            {r.user?.avatar_url ? (
              <img
                src={r.user.avatar_url}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                alt=""
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {r.user?.name?.charAt(0) || "?"}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Name + Stars + Date */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {r.user?.name || "Ẩn danh"}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleDateString("vi-VN")}
                </span>
              </div>

              {/* Comment */}
              {r.comment && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {r.comment}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
