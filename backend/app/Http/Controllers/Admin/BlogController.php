<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    // Danh sách blog
    public function index()
    {
        return Blog::orderBy('created_at', 'desc')->get();
    }

    // Thêm blog
    public function store(Request $request)
    {
        return Blog::create($request->all());
    }

    // Sửa blog
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());
        return $blog;
    }

    // Xóa blog
    public function destroy($id)
    {
        return Blog::destroy($id);
    }
}
