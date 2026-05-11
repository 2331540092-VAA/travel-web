<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Location;
use App\Models\Hotel;
use App\Models\Tour;
use App\Models\Booking;

class DashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            [
                'label' => 'Địa điểm',
                'value' => Location::count(),
                'icon'  => 'MapPin',
                'trend' => '+2.5%',
            ],
            [
                'label' => 'Khách sạn',
                'value' => Hotel::count(),
                'icon'  => 'Hotel',
                'trend' => '+4.1%',
            ],
            [
                'label' => 'Nhà hàng',
                'value' => \App\Models\Restaurant::count(),
                'icon'  => 'Utensils',
                'trend' => '+5.0%',
            ],
            [
                'label' => 'Tour du lịch',
                'value' => Tour::count(),
                'icon'  => 'Map',
                'trend' => '+3.2%',
            ],
            [
                'label' => 'Người dùng',
                'value' => User::count(),
                'icon'  => 'Users',
                'trend' => '+1.8%',
            ],
        ];

        $totalRevenue = Booking::where('status', 'paid')
            ->sum('total_amount');

        $revenue = number_format($totalRevenue, 0, ',', '.') . ' VNĐ';

        $recentBookings = Booking::with('user')
            ->orderByDesc('created_at')
            ->limit(5)
            ->get();

        return response()->json([
            'stats'           => $stats,
            'revenue'         => $revenue,
            'recent_bookings' => $recentBookings,
        ]);
    }
}
