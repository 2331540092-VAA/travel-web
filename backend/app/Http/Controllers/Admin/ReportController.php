<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function stats(Request $request)
    {
        $from = $request->input('from', now()->startOfMonth()->toDateString());
        $to = $request->input('to', now()->toDateString());

        $bookings = Booking::whereBetween('created_at', [$from, "$to 23:59:59"]);

        $totalBookings = (clone $bookings)->count();
        $totalRevenue = (clone $bookings)->where('status', '!=', 'cancelled')->sum('total_amount');
        $paidRevenue = Payment::where('status', 'completed')
            ->whereBetween('created_at', [$from, "$to 23:59:59"])
            ->sum('amount');

        $byType = (clone $bookings)->select('booking_type', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as revenue'))
            ->where('status', '!=', 'cancelled')
            ->groupBy('booking_type')
            ->get();

        $byStatus = (clone $bookings)->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $byPaymentMethod = Payment::whereBetween('created_at', [$from, "$to 23:59:59"])
            ->where('status', 'completed')
            ->select('method', DB::raw('COUNT(*) as count'), DB::raw('SUM(amount) as total'))
            ->groupBy('method')
            ->get();

        $dailyRevenue = (clone $bookings)->where('status', '!=', 'cancelled')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as revenue'), DB::raw('COUNT(*) as count'))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get();

        return response()->json([
            'from' => $from,
            'to' => $to,
            'total_bookings' => $totalBookings,
            'total_revenue' => $totalRevenue,
            'paid_revenue' => $paidRevenue,
            'by_type' => $byType,
            'by_status' => $byStatus,
            'by_payment_method' => $byPaymentMethod,
            'daily_revenue' => $dailyRevenue,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $from = $request->input('from', now()->startOfMonth()->toDateString());
        $to = $request->input('to', now()->toDateString());

        $bookings = Booking::whereBetween('created_at', [$from, "$to 23:59:59"]);

        $totalBookings = (clone $bookings)->count();
        $totalRevenue = (clone $bookings)->where('status', '!=', 'cancelled')->sum('total_amount');
        $paidRevenue = Payment::where('status', 'completed')
            ->whereBetween('created_at', [$from, "$to 23:59:59"])
            ->sum('amount');

        $byType = (clone $bookings)->select('booking_type', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as revenue'))
            ->where('status', '!=', 'cancelled')
            ->groupBy('booking_type')
            ->get();

        $byStatus = (clone $bookings)->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $byPaymentMethod = Payment::whereBetween('created_at', [$from, "$to 23:59:59"])
            ->where('status', 'completed')
            ->select('method', DB::raw('COUNT(*) as count'), DB::raw('SUM(amount) as total'))
            ->groupBy('method')
            ->get();

        $topBookings = Booking::whereBetween('created_at', [$from, "$to 23:59:59"])
            ->where('status', '!=', 'cancelled')
            ->with('user')
            ->orderByDesc('total_amount')
            ->limit(10)
            ->get();

        $data = compact('from', 'to', 'totalBookings', 'totalRevenue', 'paidRevenue', 'byType', 'byStatus', 'byPaymentMethod', 'topBookings');

        $pdf = Pdf::loadView('reports.revenue', $data)
            ->setPaper('a4', 'portrait');

        return $pdf->download("bao-cao-doanh-thu-{$from}-{$to}.pdf");
    }
}
