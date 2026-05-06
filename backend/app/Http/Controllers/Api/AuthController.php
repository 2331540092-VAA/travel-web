<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
     * QUÊN MẬT KHẨU - Gửi email reset
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Email không hợp lệ'], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Luôn trả về thành công để tránh lộ email có tồn tại hay không
        if (!$user) {
            return response()->json(['status' => true, 'message' => 'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi.']);
        }

        // Xóa token cũ, tạo token mới
        DB::table('password_resets')->where('email', $request->email)->delete();
        $token = Str::random(64);
        DB::table('password_resets')->insert([
            'email'      => $request->email,
            'token'      => Hash::make($token),
            'created_at' => now(),
        ]);

        $resetUrl = env('FRONTEND_URL', 'http://localhost:5173') . '/reset-password?token=' . $token . '&email=' . urlencode($request->email);

        Mail::send('emails.reset_password', ['resetUrl' => $resetUrl, 'user' => $user], function ($message) use ($user) {
            $message->to($user->email, $user->name)
                    ->subject('Đặt lại mật khẩu - TravelChat');
        });

        return response()->json(['status' => true, 'message' => 'Nếu email tồn tại, link đặt lại mật khẩu đã được gửi.']);
    }

    /**
     * ĐẶT LẠI MẬT KHẨU
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'                 => 'required|email',
            'token'                 => 'required',
            'password'              => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->first();

        if (!$record || !Hash::check($request->token, $record->token)) {
            return response()->json(['status' => false, 'message' => 'Token không hợp lệ hoặc đã hết hạn.'], 400);
        }

        // Token hết hạn sau 60 phút
        if (now()->diffInMinutes($record->created_at) > 60) {
            DB::table('password_resets')->where('email', $request->email)->delete();
            return response()->json(['status' => false, 'message' => 'Link đặt lại mật khẩu đã hết hạn (60 phút). Vui lòng gửi lại.'], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy tài khoản.'], 404);
        }

        $user->update(['password' => Hash::make($request->password)]);
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['status' => true, 'message' => 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập.']);
    }

    /**
     * GOOGLE OAUTH - Redirect to Google
     */
    public function redirectToGoogle()
    {
        $url = Socialite::driver('google')
            ->setHttpClient(new \GuzzleHttp\Client(['verify' => base_path('cacert.pem')]))
            ->stateless()->redirect()->getTargetUrl();

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
            $googleUser = Socialite::driver('google')
                ->setHttpClient(new \GuzzleHttp\Client(['verify' => base_path('cacert.pem')]))
                ->stateless()->user();

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
