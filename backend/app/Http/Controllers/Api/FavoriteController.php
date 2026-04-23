<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Location;
use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    private function getModelClass(string $type): ?string
    {
        return match ($type) {
            'location' => Location::class,
            'tour' => Tour::class,
            'hotel' => Hotel::class,
            'restaurant' => Restaurant::class,
            default => null,
        };
    }

    /**
     * Toggle yêu thích (thêm nếu chưa có, xóa nếu đã có)
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'type' => 'required|in:location,tour,hotel,restaurant',
            'id'   => 'required|integer',
        ]);

        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $modelClass = $this->getModelClass($request->type);

        $existing = Favorite::where('user_id', $userId)
            ->where('favoritable_type', $modelClass)
            ->where('favoritable_id', $request->id)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['is_favorite' => false, 'message' => 'Đã bỏ yêu thích']);
        }

        Favorite::create([
            'user_id'          => $userId,
            'favoritable_type' => $modelClass,
            'favoritable_id'   => $request->id,
        ]);

        return response()->json(['is_favorite' => true, 'message' => 'Đã thêm yêu thích']);
    }

    /**
     * Lấy danh sách yêu thích của user
     */
    public function index(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $favorites = Favorite::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        // Load entity data
        $result = $favorites->map(function ($fav) {
            $entity = $fav->favoritable;
            $type = match ($fav->favoritable_type) {
                Location::class => 'location',
                Tour::class => 'tour',
                Hotel::class => 'hotel',
                Restaurant::class => 'restaurant',
                default => 'unknown',
            };

            return [
                'id' => $fav->id,
                'type' => $type,
                'entity_id' => $fav->favoritable_id,
                'entity' => $entity,
                'created_at' => $fav->created_at,
            ];
        })->filter(fn($item) => $item['entity'] !== null)->values();

        return response()->json($result);
    }

    /**
     * Kiểm tra trạng thái yêu thích
     */
    public function check(Request $request)
    {
        $request->validate([
            'type' => 'required|in:location,tour,hotel,restaurant',
            'id'   => 'required|integer',
        ]);

        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json(['is_favorite' => false]);
        }

        $modelClass = $this->getModelClass($request->type);

        $exists = Favorite::where('user_id', $userId)
            ->where('favoritable_type', $modelClass)
            ->where('favoritable_id', $request->id)
            ->exists();

        return response()->json(['is_favorite' => $exists]);
    }

    /**
     * Lấy danh sách IDs yêu thích theo type
     */
    public function ids(Request $request)
    {
        $userId = auth()->id() ?? $request->user_id;
        if (!$userId) {
            return response()->json([]);
        }

        $type = $request->type;
        $modelClass = $type ? $this->getModelClass($type) : null;

        $query = Favorite::where('user_id', $userId);
        if ($modelClass) {
            $query->where('favoritable_type', $modelClass);
        }

        $ids = $query->pluck('favoritable_id');

        return response()->json($ids);
    }
}
