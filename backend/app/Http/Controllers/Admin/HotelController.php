<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        return Hotel::with('location')->get();
    }

    public function store(Request $request)
    {
        return Hotel::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->update($request->all());
        return $hotel;
    }

    public function destroy($id)
    {
        return Hotel::destroy($id);
    }
}
