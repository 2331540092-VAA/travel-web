<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * GET /api/users/{id}
     */
    public function show($id)
    {
        $user = User::with('country')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        return response()->json($user);
    }

    /**
     * PUT /api/users/{id}
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // ================= VALIDATE =================
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'date_of_birth' => 'nullable|date',
            'passport_number' => 'nullable|string|max:50',
            'country_id' => 'nullable|exists:countries,id',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // ================= UPDATE TEXT DATA =================
        // ❗ KHÔNG BAO GIỜ UPDATE NULL / ""
        $data = array_filter(
            $request->only([
                'name',
                'phone',
                'date_of_birth',
                'passport_number',
                'country_id',
            ]),
            fn($value) => !is_null($value) && $value !== ''
        );

        if (!empty($data)) {
            $user->update($data);
        }

        // ================= UPDATE AVATAR =================
        if ($request->hasFile('avatar')) {

            // Xóa avatar cũ
            if ($user->avatar_url) {
                Storage::disk('public')->delete($user->avatar_url);
            }

            $path = $request->file('avatar')->store('avatars', 'public');

            $user->update([
                'avatar_url' => $path
            ]);
        }

        return response()->json(
            $user->load('country')
        );
    }
}
