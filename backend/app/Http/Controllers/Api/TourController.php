<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tour;

class TourController extends Controller
{
    public function index()
    {
        return response()->json(
            Tour::with('schedules')->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            Tour::with('schedules')->findOrFail($id)
        );
    }
}
