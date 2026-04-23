<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Booking;
use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    private function getModelClass(string $type): ?string
    {
        return match ($type) {
            'tour' => Tour::class,
            'hotel' => Hotel::class,
            'restaurant' => Restaurant::class,
            default => null,
        };
    }

    /**
     * Lấy danh sách reviews theo entity
     */
    public function index(Request $request)
    {
        $request->validate([
            'type' => 'required|in:tour,hotel,restaurant',
            'id'   => 'required|integer',
        ]);

        $modelClass = $this->getModelClass($request->type);

        $reviews = Review::where('reviewable_type', $modelClass)
            ->where('reviewable_id', $request->id)
            ->where('is_approved', true)
            ->with('user:id,name,avatar_url')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reviews);
    }

    /**
     * Tạo review mới - chỉ user đã paid mới được review
     */
    public function store(Request $request)
    {
        $request->validate([
            'type'    => 'required|in:tour,hotel,restaurant',
            'id'      => 'required|integer',
            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $modelClass = $this->getModelClass($request->type);

        // Kiểm tra user đã có booking paid cho entity này chưa
        $hasPaidBooking = Booking::where('user_id', $userId)
            ->where('booking_type', $request->type)
            ->where('target_id', $request->id)
            ->where('status', 'paid')
            ->exists();

        if (!$hasPaidBooking) {
            return response()->json([
                'message' => 'Bạn cần có booking đã thanh toán để đánh giá'
            ], 403);
        }

        // Kiểm tra đã review chưa
        $existing = Review::where('user_id', $userId)
            ->where('reviewable_type', $modelClass)
            ->where('reviewable_id', $request->id)
            ->first();

        if ($existing) {
            // Cập nhật review cũ
            $existing->update([
                'rating'  => $request->rating,
                'comment' => $request->comment,
            ]);
            $review = $existing;
        } else {
            $review = Review::create([
                'user_id'         => $userId,
                'reviewable_type' => $modelClass,
                'reviewable_id'   => $request->id,
                'rating'          => $request->rating,
                'comment'         => $request->comment,
            ]);
        }

        // Cập nhật rating trung bình
        $this->updateEntityRating($modelClass, $request->id);

        $review->load('user:id,name,avatar_url');

        return response()->json($review, 201);
    }

    /**
     * Cập nhật rating trung bình của entity
     */
    private function updateEntityRating(string $modelClass, int $entityId)
    {
        $stats = Review::where('reviewable_type', $modelClass)
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

        $modelClass::where('id', $entityId)->update([
            'rating'        => $avg,
            'reviews_count' => $count,
            'rating_text'   => $ratingText,
        ]);
    }

    /**
     * Kiểm tra user có thể review entity này không
     */
    public function canReview(Request $request)
    {
        $request->validate([
            'type' => 'required|in:tour,hotel,restaurant',
            'id'   => 'required|integer',
        ]);

        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['can_review' => false, 'reason' => 'not_logged_in']);
        }

        $modelClass = $this->getModelClass($request->type);

        $hasPaidBooking = Booking::where('user_id', $userId)
            ->where('booking_type', $request->type)
            ->where('target_id', $request->id)
            ->where('status', 'paid')
            ->exists();

        if (!$hasPaidBooking) {
            return response()->json(['can_review' => false, 'reason' => 'no_paid_booking']);
        }

        $hasReviewed = Review::where('user_id', $userId)
            ->where('reviewable_type', $modelClass)
            ->where('reviewable_id', $request->id)
            ->exists();

        return response()->json([
            'can_review'   => true,
            'has_reviewed' => $hasReviewed,
        ]);
    }
}
