<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theme;

class ThemeController extends Controller
{
    /**
     * Get current active theme (for frontend display)
     */
    public function active()
    {
        $theme = Theme::where('is_active', true)->first();

        return response()->json($theme);
    }

    /**
     * Get all themes (public list)
     */
    public function index()
    {
        $themes = Theme::latest()->get();
        return response()->json($themes);
    }
}
