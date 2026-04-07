<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * ĐĂNG KÝ
     */
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name'       => 'required|string|max:255',
        'email'      => 'required|email|unique:users,email',
        'password'   => 'required|min:6|confirmed',
        'country_id' => 'required|exists:countries,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    $user = User::create([
        'name'       => $request->name,
        'email'      => $request->email,
        'password'   => Hash::make($request->password),
        'country_id' => $request->country_id,
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Đăng ký thành công',
        'user' => $user->load('country')
    ], 201);
}


    /**
     * ĐĂNG NHẬP
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Email hoặc mật khẩu không đúng'
            ], 401);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Đăng nhập thành công',
            'user'    => $user->load('country'), // ✅ QUAN TRỌNG
        ]);
    }

    /**
     * LOGOUT
     */
    public function logout()
    {
        return response()->json([
            'status' => true,
            'message' => 'Đã đăng xuất'
        ]);
    }

    /**
     * GOOGLE OAUTH - Redirect to Google
     */
    public function redirectToGoogle()
    {
        $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'status' => true,
            'url' => $url,
        ]);
    }

    /**
     * GOOGLE OAUTH - Handle callback
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::where('google_id', $googleUser->getId())->first();

            if (!$user) {
                $user = User::where('email', $googleUser->getEmail())->first();

                if ($user) {
                    $user->update(['google_id' => $googleUser->getId()]);
                } else {
                    $user = User::create([
                        'name'      => $googleUser->getName(),
                        'email'     => $googleUser->getEmail(),
                        'google_id' => $googleUser->getId(),
                        'avatar_url' => $googleUser->getAvatar(),
                    ]);
                }
            }

            $user->load('country');

            $data = base64_encode(json_encode([
                'status' => true,
                'user'   => $user,
            ]));

            return redirect("http://localhost:5173/auth/google/callback?data={$data}");

        } catch (\Exception $e) {
            $error = urlencode('Đăng nhập Google thất bại: ' . $e->getMessage());
            return redirect("http://localhost:5173/auth/google/callback?error={$error}");
        }
    }
}
