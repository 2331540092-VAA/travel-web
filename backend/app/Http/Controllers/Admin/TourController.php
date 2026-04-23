<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use App\Models\TourDepartures;
use Illuminate\Http\Request;

class TourController extends Controller
{
    /**
     * Get all tours
     */
    public function index()
    {
        $tours = Tour::with('location')
            ->withMin('departures', 'price')
            ->withMax('departures', 'discount_percent')
            ->latest()
            ->get()
            ->map(function ($tour) {
                $tour->price = $tour->departures_min_price;
                $tour->discount_percent = $tour->departures_max_discount_percent;
                return $tour;
            });
        return response()->json($tours);
    }

    /**
     * Get single tour
     */
    public function show($id)
    {
        $tour = Tour::with('location')
            ->withMin('departures', 'price')
            ->withMax('departures', 'discount_percent')
            ->findOrFail($id);

        $tour->price = $tour->departures_min_price;
        $tour->discount_percent = $tour->departures_max_discount_percent;

        return response()->json($tour);
    }

    /**
     * Create tour
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_id' => 'nullable|exists:locations,id',
            'name' => 'required|string|max:255',
            'days' => 'nullable|integer|min:1',
            'price' => 'required|numeric',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'combo_content' => 'nullable|string',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string'
        ]);

        $price = $validated['price'];
        $discount = $validated['discount_percent'] ?? 0;
        unset($validated['price'], $validated['discount_percent']);

        $tour = Tour::create($validated);

        // Tạo departure mặc định với giá
        $tour->departures()->create([
            'departure_date' => now()->addDays(7)->toDateString(),
            'capacity' => 20,
            'price' => $price,
            'discount_percent' => $discount,
            'status' => 'available',
        ]);

        return response()->json([
            'message' => 'Tour created successfully',
            'data' => $tour
        ], 201);
    }

    /**
     * Update tour
     */
    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);

        $validated = $request->validate([
            'location_id' => 'nullable|exists:locations,id',
            'name' => 'required|string|max:255',
            'days' => 'nullable|integer|min:1',
            'price' => 'required|numeric',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'combo_content' => 'nullable|string',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string'
        ]);

        $price = $validated['price'];
        $discount = $validated['discount_percent'] ?? 0;
        unset($validated['price'], $validated['discount_percent']);

        $tour->update($validated);

        // Cập nhật giá vào departure (sửa cái rẻ nhất, hoặc tạo mới nếu chưa có)
        $departure = $tour->departures()->orderBy('price')->first();
        if ($departure) {
            $departure->update([
                'price' => $price,
                'discount_percent' => $discount,
            ]);
        } else {
            $tour->departures()->create([
                'departure_date' => now()->addDays(7)->toDateString(),
                'capacity' => 20,
                'price' => $price,
                'discount_percent' => $discount,
                'status' => 'available',
            ]);
        }

        return response()->json([
            'message' => 'Tour updated successfully',
            'data' => $tour
        ]);
    }

    /**
     * Delete tour
     */
    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);

        $tour->delete();

        return response()->json([
            'message' => 'Tour deleted successfully'
        ]);
    }
}