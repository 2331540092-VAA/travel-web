<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Báo cáo doanh thu</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #333; line-height: 1.5; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 15px; }
        .header h1 { font-size: 22px; color: #1e40af; margin-bottom: 5px; }
        .header p { color: #64748b; font-size: 11px; }
        .period { background: #eff6ff; padding: 10px 15px; border-radius: 6px; text-align: center; margin-bottom: 25px; font-size: 13px; color: #1e40af; font-weight: bold; }
        .stats-grid { display: table; width: 100%; margin-bottom: 25px; }
        .stat-box { display: table-cell; width: 33.33%; text-align: center; padding: 12px; border: 1px solid #e2e8f0; }
        .stat-box .value { font-size: 20px; font-weight: bold; color: #1e40af; }
        .stat-box .label { font-size: 10px; color: #64748b; margin-top: 3px; }
        .section { margin-bottom: 25px; }
        .section h2 { font-size: 14px; color: #1e40af; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th { background: #1e40af; color: white; padding: 8px 10px; text-align: left; }
        td { padding: 7px 10px; border-bottom: 1px solid #e2e8f0; }
        tr:nth-child(even) td { background: #f8fafc; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; }
        .badge-tour { background: #dbeafe; color: #1e40af; }
        .badge-hotel { background: #fef3c7; color: #92400e; }
        .badge-restaurant { background: #d1fae5; color: #065f46; }
        .footer { margin-top: 30px; text-align: center; color: #94a3b8; font-size: 10px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>BÁO CÁO DOANH THU</h1>
        <p>TravelChat - Hệ thống quản lý du lịch</p>
    </div>

    <div class="period">
        Kỳ báo cáo: {{ \Carbon\Carbon::parse($from)->format('d/m/Y') }} – {{ \Carbon\Carbon::parse($to)->format('d/m/Y') }}
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
        <div class="stat-box">
            <div class="value">{{ number_format($totalBookings) }}</div>
            <div class="label">TỔNG ĐƠN ĐẶT</div>
        </div>
        <div class="stat-box">
            <div class="value">{{ number_format($totalRevenue, 0, ',', '.') }}đ</div>
            <div class="label">DOANH THU (ĐƠN KHÔNG HỦY)</div>
        </div>
        <div class="stat-box">
            <div class="value">{{ number_format($paidRevenue, 0, ',', '.') }}đ</div>
            <div class="label">ĐÃ THANH TOÁN</div>
        </div>
    </div>

    <!-- By Type -->
    <div class="section">
        <h2>Doanh thu theo loại dịch vụ</h2>
        <table>
            <thead>
                <tr>
                    <th>Loại</th>
                    <th class="text-center">Số đơn</th>
                    <th class="text-right">Doanh thu</th>
                </tr>
            </thead>
            <tbody>
                @foreach($byType as $item)
                <tr>
                    <td>
                        <span class="badge badge-{{ $item->booking_type }}">
                            {{ $item->booking_type === 'tour' ? 'Tour' : ($item->booking_type === 'hotel' ? 'Khách sạn' : 'Nhà hàng') }}
                        </span>
                    </td>
                    <td class="text-center">{{ $item->count }}</td>
                    <td class="text-right">{{ number_format($item->revenue, 0, ',', '.') }}đ</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- By Status -->
    <div class="section">
        <h2>Phân bổ theo trạng thái</h2>
        <table>
            <thead>
                <tr>
                    <th>Trạng thái</th>
                    <th class="text-center">Số đơn</th>
                </tr>
            </thead>
            <tbody>
                @foreach($byStatus as $item)
                <tr>
                    <td>{{ ucfirst($item->status) }}</td>
                    <td class="text-center">{{ $item->count }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- By Payment Method -->
    @if($byPaymentMethod->count() > 0)
    <div class="section">
        <h2>Thanh toán theo phương thức</h2>
        <table>
            <thead>
                <tr>
                    <th>Phương thức</th>
                    <th class="text-center">Số giao dịch</th>
                    <th class="text-right">Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                @foreach($byPaymentMethod as $item)
                <tr>
                    <td>{{ strtoupper($item->method) }}</td>
                    <td class="text-center">{{ $item->count }}</td>
                    <td class="text-right">{{ number_format($item->total, 0, ',', '.') }}đ</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <!-- Top Bookings -->
    @if($topBookings->count() > 0)
    <div class="section">
        <h2>Top 10 đơn đặt giá trị cao nhất</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Khách hàng</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                    <th class="text-right">Giá trị</th>
                </tr>
            </thead>
            <tbody>
                @foreach($topBookings as $i => $booking)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $booking->user->name ?? 'N/A' }}</td>
                    <td>
                        <span class="badge badge-{{ $booking->booking_type }}">
                            {{ $booking->booking_type === 'tour' ? 'Tour' : ($booking->booking_type === 'hotel' ? 'Khách sạn' : 'Nhà hàng') }}
                        </span>
                    </td>
                    <td>{{ ucfirst($booking->status) }}</td>
                    <td class="text-right">{{ number_format($booking->total_amount, 0, ',', '.') }}đ</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif

    <div class="footer">
        <p>Xuất lúc: {{ now()->format('d/m/Y H:i:s') }} | TravelChat Admin System</p>
    </div>
</body>
</html>
