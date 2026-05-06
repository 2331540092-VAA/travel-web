<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #1e293b; padding: 36px; }
        .header { border-bottom: 3px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
        .brand { font-size: 22px; font-weight: 700; color: #2563eb; }
        .subtitle { font-size: 11px; color: #64748b; margin-top: 4px; }
        .period { text-align: right; font-size: 11px; color: #64748b; }
        .period strong { font-size: 13px; color: #0f172a; display: block; }
        h2 { font-size: 14px; font-weight: 700; color: #1e293b; margin: 20px 0 10px; border-left: 4px solid #2563eb; padding-left: 10px; }
        .summary { display: flex; gap: 16px; margin-bottom: 8px; }
        .card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; }
        .card .label { font-size: 10px; color: #64748b; text-transform: uppercase; }
        .card .value { font-size: 20px; font-weight: 800; color: #1e293b; margin-top: 4px; }
        .card.green .value { color: #16a34a; }
        .card.purple .value { color: #7c3aed; }
        table { width: 100%; border-collapse: collapse; margin-top: 6px; }
        th { background: #f1f5f9; text-align: left; padding: 8px 10px; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700; }
        td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 11px; }
        tr:last-child td { border-bottom: none; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; }
        .badge-paid { background: #dcfce7; color: #16a34a; }
        .badge-pending { background: #fef9c3; color: #ca8a04; }
        .badge-cancelled { background: #fee2e2; color: #dc2626; }
        .footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; text-align: center; font-size: 10px; color: #94a3b8; }
        .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .bar-label { width: 90px; font-size: 11px; color: #475569; }
        .bar-track { flex: 1; background: #f1f5f9; border-radius: 4px; height: 14px; }
        .bar-fill { background: #2563eb; border-radius: 4px; height: 14px; }
        .bar-val { font-size: 10px; color: #64748b; min-width: 80px; text-align: right; }
    </style>
</head>
<body>

<div class="header">
    <div>
        <div class="brand">TravelChat SEA</div>
        <div class="subtitle">Báo cáo doanh thu hệ thống</div>
    </div>
    <div class="period">
        <span>Kỳ báo cáo</span>
        <strong>{{ \Carbon\Carbon::parse($from)->format('d/m/Y') }} – {{ \Carbon\Carbon::parse($to)->format('d/m/Y') }}</strong>
    </div>
</div>

<!-- Summary -->
<h2>Tổng quan</h2>
<div class="summary">
    <div class="card">
        <div class="label">Tổng đơn đặt</div>
        <div class="value">{{ number_format($total_bookings) }}</div>
    </div>
    <div class="card green">
        <div class="label">Tổng doanh thu</div>
        <div class="value">{{ number_format($total_revenue, 0, ',', '.') }}đ</div>
    </div>
    <div class="card purple">
        <div class="label">Đã thanh toán</div>
        <div class="value">{{ number_format($paid_revenue, 0, ',', '.') }}đ</div>
    </div>
</div>

<!-- By Type -->
@if($by_type->count())
<h2>Theo loại dịch vụ</h2>
@php $maxRev = $by_type->max('revenue') ?: 1; @endphp
@foreach($by_type as $row)
@php
    $labels = ['tour' => 'Tour', 'hotel' => 'Khách sạn', 'restaurant' => 'Nhà hàng'];
    $pct = round(($row->revenue / $maxRev) * 100);
@endphp
<div class="bar-row">
    <div class="bar-label">{{ $labels[$row->booking_type] ?? $row->booking_type }}</div>
    <div class="bar-track"><div class="bar-fill" style="width:{{ $pct }}%"></div></div>
    <div class="bar-val">{{ $row->count }} đơn · {{ number_format($row->revenue, 0, ',', '.') }}đ</div>
</div>
@endforeach
@endif

<!-- By Status -->
@if($by_status->count())
<h2>Theo trạng thái</h2>
<table>
    <tr><th>Trạng thái</th><th>Số đơn</th></tr>
    @foreach($by_status as $row)
    @php
        $statusLabels = ['pending'=>'Chờ xử lý','confirmed'=>'Đã xác nhận','paid'=>'Đã thanh toán','cancelled'=>'Đã hủy'];
        $badgeClass = ['paid'=>'badge-paid','pending'=>'badge-pending','cancelled'=>'badge-cancelled'][$row->status] ?? '';
    @endphp
    <tr>
        <td><span class="badge {{ $badgeClass }}">{{ $statusLabels[$row->status] ?? $row->status }}</span></td>
        <td>{{ $row->count }}</td>
    </tr>
    @endforeach
</table>
@endif

<!-- Daily Revenue -->
@if($daily_revenue->count())
<h2>Doanh thu theo ngày</h2>
<table>
    <tr><th>Ngày</th><th>Số đơn</th><th>Doanh thu</th></tr>
    @foreach($daily_revenue as $row)
    <tr>
        <td>{{ \Carbon\Carbon::parse($row->date)->format('d/m/Y') }}</td>
        <td>{{ $row->count }}</td>
        <td>{{ number_format($row->revenue, 0, ',', '.') }}đ</td>
    </tr>
    @endforeach
</table>
@endif

<div class="footer">
    Báo cáo được tạo tự động bởi hệ thống TravelChat SEA · {{ now()->format('d/m/Y H:i') }}
</div>

</body>
</html>
