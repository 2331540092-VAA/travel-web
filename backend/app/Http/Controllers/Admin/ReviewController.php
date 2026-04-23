<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with(['user:id,name,avatar_url']);

        if ($request->type) {
            $modelClass = match ($request->type) {
                'tour' => \App\Models\Tour::class,
                'hotel' => \App\Models\Hotel::class,
                'restaurant' => \App\Models\Restaurant::class,
                default => null,
            };
            if ($modelClass) {
                $query->where('reviewable_type', $modelClass);
            }
        }

        if ($request->has('is_approved')) {
            $query->where('is_approved', $request->boolean('is_approved'));
        }

        $reviews = $query->orderBy('created_at', 'desc')->get();

        // Attach entity name
        $reviews->each(function ($review) {
            $entity = $review->reviewable;
            $review->entity_name = $entity ? $entity->name : 'N/A';
            $review->entity_type = match ($review->reviewable_type) {
                \App\Models\Tour::class => 'tour',
                \App\Models\Hotel::class => 'hotel',
                \App\Models\Restaurant::class => 'restaurant',
                default => 'unknown',
            };
        });

        return response()->json($reviews);
    }

    public function approve($id)
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => true]);

        // Recalculate rating
        $this->recalcRating($review);

        return response()->json(['message' => 'Review đã được duyệt']);
    }

    public function reject($id)
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => false]);

        // Recalculate rating
        $this->recalcRating($review);

        return response()->json(['message' => 'Review đã bị từ chối']);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $type = $review->reviewable_type;
        $entityId = $review->reviewable_id;

        $review->delete();

        // Recalculate rating after delete
        $stats = Review::where('reviewable_type', $type)
            ->where('reviewable_id', $entityId)
            ->where('is_approved', true)
            ->selectRaw('AVG(rating) as avg_rating, COUNT(*) as total')
            ->first();

        $avg = round($stats->avg_rating ?? 0, 1);
        $count = $stats->total ?? 0;
        $ratingText = match (true) {
            $avg >= 4.5 => 'Tuyệt vời',
            $avg >= 4.0 => 'Rất tốt',
            $avg >= 3.5 => 'Tốt',
            $avg >= 3.0 => 'Khá',
            $avg >= 2.0 => 'Trung bình',
            default     => 'Chưa đánh giá',
        };

        $type::where('id', $entityId)->update([
            'rating' => $avg,
            'reviews_count' => $count,
            'rating_text' => $ratingText,
        ]);

        return response()->json(['message' => 'Review đã bị xóa']);
    }

    private function recalcRating(Review $review)
    {
        $stats = Review::where('reviewable_type', $review->reviewable_type)
            ->where('reviewable_id', $review->reviewable_id)
            ->where('is_approved', true)
            ->selectRaw('AVG(rating) as avg_rating, COUNT(*) as total')
            ->first();

        $avg = round($stats->avg_rating ?? 0, 1);
        $count = $stats->total ?? 0;
        $ratingText = match (true) {
            $avg >= 4.5 => 'Tuyệt vời',
            $avg >= 4.0 => 'Rất tốt',
            $avg >= 3.5 => 'Tốt',
            $avg >= 3.0 => 'Khá',
            $avg >= 2.0 => 'Trung bình',
            default     => 'Chưa đánh giá',
        };

        $review->reviewable_type::where('id', $review->reviewable_id)->update([
            'rating' => $avg,
            'reviews_count' => $count,
            'rating_text' => $ratingText,
        ]);
    }
}
