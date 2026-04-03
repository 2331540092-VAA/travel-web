<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * GET DASHBOARD STATISTICS
     */
    public function index()
    {
        $stats = [
            [
                'label' => 'Tổng Tours',
                'value' => Tour::count(),
                'icon'  => 'MapPin',
                'color' => 'bg-blue-500',
                'trend' => '+0%' // Placeholder
            ],
            [
                'label' => 'Tổng Khách sạn',
                'value' => Hotel::count(),
                'icon'  => 'Hotel',
                'color' => 'bg-purple-500',
                'trend' => '+0%'
            ],
            [
                'label' => 'Tổng Nhà hàng',
                'value' => Restaurant::count(),
                'icon'  => 'Utensils',
                'color' => 'bg-amber-500',
                'trend' => '+0%'
            ],
            [
                'label' => 'Người dùng',
                'value' => User::count(),
                'icon'  => 'Users',
                'color' => 'bg-emerald-500',
                'trend' => '+0%'
            ]
        ];

        // Doanh thu (ví dụ cộng dồn từ Booking thành công)
        $revenue = Booking::whereIn('status', ['confirmed', 'paid'])->sum('total_amount');

        return response()->json([
            'stats'           => $stats,
            'revenue'         => number_format($revenue, 0, ',', '.') . ' VNĐ',
            'recent_bookings' => \App\Models\Booking::with('user')->latest()->take(5)->get(),
            'counts'          => [
                'tours'       => Tour::count(),
                'total_users' => User::count(),
                'total_revenue' => $revenue,
            ]
        ]);

    }
}
