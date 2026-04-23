import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showText?: boolean;
  reviewsCount?: number;
}

export default function StarRating({
  rating: rawRating,
  size = 16,
  showText = false,
  reviewsCount,
}: StarRatingProps) {
  const rating = Number(rawRating) || 0;
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              size={size}
              className={
                filled
                  ? "text-yellow-400 fill-yellow-400"
                  : half
                    ? "text-yellow-400 fill-yellow-200"
                    : "text-gray-300"
              }
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-sm text-gray-500 ml-1">
          {rating > 0 ? rating.toFixed(1) : "0"}
          {reviewsCount !== undefined && (
            <span className="ml-1">({reviewsCount} đánh giá)</span>
          )}
        </span>
      )}
    </div>
  );
}
