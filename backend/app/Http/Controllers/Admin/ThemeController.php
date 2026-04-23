<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ThemeController extends Controller
{
    /**
     * Get all themes
     */
    public function index()
    {
        $themes = Theme::latest()->get();
        return response()->json($themes);
    }

    /**
     * Get single theme
     */
    public function show($id)
    {
        $theme = Theme::findOrFail($id);
        return response()->json($theme);
    }

    /**
     * Create theme
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'banner_url' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'accent_color' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'config' => 'nullable|array',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $theme = Theme::create($validated);

        return response()->json([
            'message' => 'Theme created successfully',
            'data' => $theme
        ], 201);
    }

    /**
     * Update theme
     */
    public function update(Request $request, $id)
    {
        $theme = Theme::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'banner_url' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'accent_color' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'config' => 'nullable|array',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $theme->update($validated);

        return response()->json([
            'message' => 'Theme updated successfully',
            'data' => $theme
        ]);
    }

    /**
     * Delete theme
     */
    public function destroy($id)
    {
        $theme = Theme::findOrFail($id);
        $theme->delete();

        return response()->json([
            'message' => 'Theme deleted successfully'
        ]);
    }

    /**
     * Toggle theme active/inactive
     * Khi bật 1 theme → tự động tắt các theme khác
     */
    public function toggleActive($id)
    {
        $theme = Theme::findOrFail($id);

        if (!$theme->is_active) {
            // Tắt tất cả theme khác trước
            Theme::where('id', '!=', $id)->update(['is_active' => false]);
        }

        $theme->is_active = !$theme->is_active;
        $theme->save();

        return response()->json([
            'message' => $theme->is_active ? 'Theme activated' : 'Theme deactivated',
            'data' => $theme
        ]);
    }
}
