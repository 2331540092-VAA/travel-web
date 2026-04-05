<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index()
    {
        return Tour::with('location')->get();
    }

    public function store(Request $request)
    {
        return Tour::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);
        $tour->update($request->all());
        return $tour;
    }

    public function destroy($id)
    {
        return Tour::destroy($id);
    }
}
