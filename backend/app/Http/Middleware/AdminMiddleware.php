<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $userId = session('user_id');

        $user = User::find($userId);

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden - Admin only'
            ], 403);
        }

        return $next($request);
    }
}
