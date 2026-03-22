<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
    public function index()
    {
        return response()->json(
            Location::with('country')->get()
        );
    }

    public function show($id)
    {
        $location = Location::with(['country', 'hotels', 'restaurants', 'tours'])
            ->findOrFail($id);

        // ẢNH CHÍNH
        $mainImage = DB::table('media_gallery')
            ->where('target_type', 'place')
            ->where('target_id', $id)
            ->where('is_primary', true)
            ->value('image_path');

        // ẢNH PHỤ
        $gallery = DB::table('media_gallery')
            ->where('target_type', 'place')
            ->where('target_id', $id)
            ->where('is_primary', false)
            ->pluck('image_path');

        return response()->json([
            'id' => $location->id,
            'name' => $location->name,
            'description' => $location->description,
            'address' => $location->address,
            'country' => $location->country,

            // 👇 QUAN TRỌNG
            'image_url' => $mainImage ? asset($mainImage) : null,
            'gallery' => $gallery->map(fn ($img) => asset($img)),

            'hotels' => $location->hotels,
            'restaurants' => $location->restaurants,
            'tours' => $location->tours,
        ]);
    }
}
