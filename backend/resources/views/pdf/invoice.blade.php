<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Hóa Đơn Booking #{{ $booking->id }}</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 14px; color: #333; }
        .header { width: 100%; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header td { vertical-align: middle; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
        .title { text-align: right; font-size: 20px; color: #555; text-transform: uppercase; }
        .info-table { width: 100%; margin-bottom: 30px; }
        .info-table th { text-align: left; padding-bottom: 5px; color: #666; font-size: 12px; }
        .info-table td { font-weight: bold; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .items-table th { background-color: #f8fafc; color: #333; }
        .total-row td { font-weight: bold; font-size: 16px; background-color: #eff6ff; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; border: 1px solid #16a34a; color: #16a34a; }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td class="logo">TRAVEL SE ASIA</td>
            <td class="title">
                HÓA ĐƠN ĐIỆN TỬ<br>
                <small style="font-size:12px; color:#888;">#INV-{{ str_pad($booking->id, 5, '0', STR_PAD_LEFT) }}</small>
            </td>
        </tr>
    </table>

    <table class="info-table">
        <tr>
            <th>KHÁCH HÀNG</th>
            <th>NGÀY LẬP</th>
            <th>TRẠNG THÁI</th>
        </tr>
        <tr>
            <td>
                {{ $booking->user->name ?? 'Khách hàng' }}<br>
                <span style="font-weight:normal;font-size:12px;color:#555;">{{ $booking->user->email ?? 'Không có email' }}</span>
            </td>
            <td>{{ \Carbon\Carbon::parse($booking->created_at)->format('d/m/Y H:i') }}</td>
            <td><span class="badge">ĐÃ THANH TOÁN</span></td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th>Dịch Vụ</th>
                <th>Chi tiết Booking</th>
                <th>SL</th>
                <th style="text-align:right">Thành Tiền</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-transform: capitalize;">{{ $booking->booking_type }}</td>
                <td>
                    {{ $serviceName }}<br>
                    <span style="font-weight:normal;font-size:12px;color:#555;">
                        Lịch trình: {{ $booking->check_in ? \Carbon\Carbon::parse($booking->check_in)->format('d/m/Y') : \Carbon\Carbon::parse($booking->booking_date)->format('d/m/Y') }}<br>
                        Mã tham chiếu hệ thống: {{ $booking->target_id }}
                    </span>
                </td>
                <td>{{ $booking->quantity }}</td>
                <td style="text-align:right">{{ number_format($booking->total_amount, 0, ',', '.') }} VNĐ</td>
            </tr>
            <tr class="total-row">
                <td colspan="3" style="text-align:right">TỔNG CỘNG THU</td>
                <td style="text-align:right; color:#2563eb;">{{ number_format($booking->total_amount, 0, ',', '.') }} VNĐ</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        Cảm ơn Quý khách đã tin tưởng và sử dụng dịch vụ của Travel SE Asia!<br>
        Đây là hóa đơn điện tử hợp lệ được kết xuất tự động từ hệ thống máy chủ an toàn.<br>
        <i>Vui lòng xuất trình mã Booking hoặc mã QR trên ứng dụng khi làm thủ tục.</i>
    </div>
</body>
</html>
