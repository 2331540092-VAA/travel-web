<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function stats(Request $request)
    {
        $from = $request->query('from', now()->startOfMonth()->toDateString());
        $to   = $request->query('to',   now()->toDateString());

        $base = Booking::whereBetween(DB::raw('DATE(created_at)'), [$from, $to]);
        $effectiveBookings = (clone $base)->whereNotIn('status', ['pending', 'cancelled']);

        $totalBookings = (clone $base)->count();
        $nonCancelledBookings = (clone $base)->where('status', '!=', 'cancelled')->count();
        $totalRevenue  = (clone $effectiveBookings)->sum('total_amount');
        $paidRevenue   = (clone $base)->where('status', 'paid')->sum('total_amount');

        $byType = (clone $effectiveBookings)
            ->select('booking_type', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as revenue'))
            ->groupBy('booking_type')
            ->get();

        $byStatus = (clone $base)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $byPaymentMethod = (clone $base)
            ->select('payment_type as method', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as total'))
            ->where('status', 'paid')
            ->groupBy('payment_type')
            ->get();

        $dailyRevenue = (clone $effectiveBookings)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as revenue'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy(DB::raw('DATE(created_at)'))
            ->get()
            ->map(fn($item) => [
                'date'    => $item->date,
                'revenue' => (float) $item->revenue,
                'count'   => (int) $item->count,
            ]);

        return response()->json([
            'from'               => $from,
            'to'                 => $to,
            'total_bookings'     => $totalBookings,
            'non_cancelled_bookings' => $nonCancelledBookings,
            'total_revenue'      => (float) $totalRevenue,
            'paid_revenue'       => (float) $paidRevenue,
            'by_type'            => $byType->map(fn($item) => [
                'booking_type' => $item->booking_type,
                'count'        => (int) $item->count,
                'revenue'      => (float) $item->revenue,
            ]),
            'by_status'          => $byStatus,
            'by_payment_method'  => $byPaymentMethod->map(fn($item) => [
                'method' => $item->method,
                'count'  => (int) $item->count,
                'total'  => (float) $item->total,
            ]),
            'daily_revenue'      => $dailyRevenue,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $from = $request->query('from', now()->startOfMonth()->toDateString());
        $to   = $request->query('to',   now()->toDateString());

        $base = Booking::whereBetween(DB::raw('DATE(created_at)'), [$from, $to]);
        $effectiveBookings = (clone $base)->whereNotIn('status', ['pending', 'cancelled']);

        $data = [
            'from'           => $from,
            'to'             => $to,
            'total_bookings' => (clone $base)->count(),
            'total_revenue'  => (float) (clone $effectiveBookings)->sum('total_amount'),
            'paid_revenue'   => (float) (clone $base)->where('status', 'paid')->sum('total_amount'),
            'by_type'        => (clone $effectiveBookings)
                ->select('booking_type', DB::raw('COUNT(*) as count'), DB::raw('SUM(total_amount) as revenue'))
                ->groupBy('booking_type')->get(),
            'by_status'      => (clone $base)
                ->select('status', DB::raw('COUNT(*) as count'))
                ->groupBy('status')->get(),
            'daily_revenue'  => (clone $effectiveBookings)
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total_amount) as revenue'), DB::raw('COUNT(*) as count'))
                ->groupBy(DB::raw('DATE(created_at)'))->orderBy(DB::raw('DATE(created_at)'))->get(),
        ];

        $pdf = Pdf::loadView('reports.report', $data)->setPaper('a4', 'portrait');
        return $pdf->download("BaoCao_{$from}_{$to}.pdf");
    }
}

