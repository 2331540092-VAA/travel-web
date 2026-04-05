<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google OAuth page
     * Frontend sẽ gọi endpoint này để lấy URL Google OAuth
     */
    public function redirectToGoogle()
    {
        try {
            $url = Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl();

            return response()->json([
                'status' => true,
                'url' => $url
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không thể kết nối Google OAuth: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle Google OAuth callback
     * Google sẽ redirect về đây sau khi user đăng nhập
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            // Get user info from Google
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();

            // Find or create user
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // User đã tồn tại - update Google info
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'auth_provider' => 'google',
                    'avatar_url' => $googleUser->getAvatar() ?? $user->avatar_url,
                ]);
            } else {
                // Tạo user mới
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'auth_provider' => 'google',
                    'avatar_url' => $googleUser->getAvatar(),
                    'password' => null, // OAuth users không có password
                ]);
            }

            // Load relationship
            $user->load('country');

            // Redirect về frontend với user data
            $frontendUrl = env('FRONTEND_URL', 'https://192.168.123.23:5173') . '/auth/google/callback';
            $userData = base64_encode(json_encode([
                'status' => true,
                'user' => $user,
                'message' => 'Đăng nhập Google thành công'
            ]));

            return redirect($frontendUrl . '?data=' . $userData);

        } catch (\Exception $e) {
            \Log::error('Google OAuth Error: ' . $e->getMessage());

            // Redirect về login page với error
            return redirect(env('FRONTEND_URL', 'https://192.168.123.23:5173') . '/login?error=' . urlencode('Đăng nhập Google thất bại'));
        }
    }
}
