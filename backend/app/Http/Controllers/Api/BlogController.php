<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(
            Blog::where('is_published', true)->latest()->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            Blog::findOrFail($id)
        );
    }
}
