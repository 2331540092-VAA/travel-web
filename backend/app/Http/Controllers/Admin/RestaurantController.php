<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        return Restaurant::with('location')->get();
    }

    public function store(Request $request)
    {
        return Restaurant::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($request->all());
        return $restaurant;
    }

    public function destroy($id)
    {
        return Restaurant::destroy($id);
    }
}
