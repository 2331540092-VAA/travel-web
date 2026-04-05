<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Explore;

class ExploreController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Explore::query();
        
        if ($request->has('category')) {
            $slug = strtolower(str_replace('-', ' ', $request->category));
            $rawSlug = $request->category;

            $query->where(function($q) use ($slug, $rawSlug) {
                $q->whereRaw('LOWER(title) LIKE ?', ["%{$slug}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$slug}%"])
                  ->orWhereHas('category', function($cat_q) use ($rawSlug, $slug) {
                      $cat_q->where('slug', $rawSlug)
                            ->orWhereRaw('LOWER(name) LIKE ?', ["%{$slug}%"]);
                  });
            });
        }

        return response()->json(
            $query->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            Explore::with(['category', 'country'])->findOrFail($id)
        );
    }
}
