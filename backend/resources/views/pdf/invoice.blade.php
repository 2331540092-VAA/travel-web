<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #1e293b;
            background: #fff;
            padding: 40px;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .brand-name {
            font-size: 26px;
            font-weight: 700;
            color: #2563eb;
            letter-spacing: 1px;
        }
        .brand-sub {
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
        }
        .invoice-meta {
            text-align: right;
        }
        .invoice-meta .label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .invoice-meta .value {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
        }
        .invoice-title {
            font-size: 16px;
            font-weight: 700;
            color: #2563eb;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* Status badge */
        .status-badge {
            display: inline-block;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            background: #dcfce7;
            color: #16a34a;
            margin-top: 6px;
        }

        /* Section */
        .section {
            margin-bottom: 24px;
        }
        .section-title {
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 1px;
            font-weight: 700;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
        }

        /* Info grid */
        .info-grid {
            width: 100%;
            border-collapse: collapse;
        }
        .info-grid td {
            padding: 6px 0;
            vertical-align: top;
        }
        .info-label {
            color: #64748b;
            font-size: 12px;
            width: 45%;
        }
        .info-value {
            font-weight: 600;
            color: #1e293b;
        }

        /* Ticket box */
        .ticket-box {
            border: 2px dashed #93c5fd;
            border-radius: 12px;
            padding: 20px 24px;
            background: #eff6ff;
            margin-bottom: 24px;
            position: relative;
        }
        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        .ticket-title {
            font-size: 22px;
            font-weight: 900;
            color: #1d4ed8;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        .ticket-type {
            background: #dbeafe;
            color: #1d4ed8;
            padding: 3px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .ticket-grid {
            width: 100%;
            border-collapse: collapse;
        }
        .ticket-grid td {
            padding: 8px 0;
            width: 50%;
        }
        .ticket-label {
            font-size: 10px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .ticket-value {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
            margin-top: 2px;
        }

        /* Total */
        .total-box {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 10px;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
        }
        .total-label {
            font-size: 15px;
            font-weight: 700;
            color: #334155;
        }
        .total-amount {
            font-size: 24px;
            font-weight: 900;
            color: #2563eb;
        }

        /* Footer */
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 16px;
            text-align: center;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.7;
        }
        .footer strong {
            color: #64748b;
        }

        /* Type colors */
        .type-tour .ticket-title { color: #7c3aed; }
        .type-tour { border-color: #c4b5fd; background: #f5f3ff; }
        .type-tour .ticket-type { background: #ede9fe; color: #7c3aed; }

        .type-restaurant .ticket-title { color: #d97706; }
        .type-restaurant { border-color: #fcd34d; background: #fffbeb; }
        .type-restaurant .ticket-type { background: #fef3c7; color: #d97706; }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="header">
        <div>
            <div class="brand-name">TravelChat SEA</div>
            <div class="brand-sub">Nền tảng du lịch Đông Nam Á</div>
        </div>
        <div class="invoice-meta">
            <div class="invoice-title">HÓA ĐƠN</div>
            <div class="label">Mã hóa đơn</div>
            <div class="value">#{{ str_pad($booking->id, 6, '0', STR_PAD_LEFT) }}</div>
            <div class="label" style="margin-top:6px;">Ngày xuất</div>
            <div class="value">{{ now()->format('d/m/Y H:i') }}</div>
        </div>
    </div>

    <!-- Booking Info -->
    <div class="section">
        <div class="section-title">Thông tin khách hàng</div>
        <table class="info-grid">
            <tr>
                <td class="info-label">Họ tên:</td>
                <td class="info-value">{{ $user->name ?? 'Quý khách' }}</td>
            </tr>
            <tr>
                <td class="info-label">Email:</td>
                <td class="info-value">{{ $user->email ?? '—' }}</td>
            </tr>
            <tr>
                <td class="info-label">Ngày đặt:</td>
                <td class="info-value">{{ \Carbon\Carbon::parse($booking->created_at)->format('d/m/Y H:i') }}</td>
            </tr>
        </table>
    </div>

    <!-- E-Ticket -->
    <div class="ticket-box type-{{ $booking->booking_type }}">
        <div class="ticket-header">
            <div class="ticket-title">E-TICKET</div>
            <div class="ticket-type">{{ strtoupper($booking->booking_type) }}</div>
        </div>
        <table class="ticket-grid">
            <tr>
                <td>
                    <div class="ticket-label">Mã đặt chỗ</div>
                    <div class="ticket-value">#{{ $booking->id }}</div>
                </td>
                <td>
                    <div class="ticket-label">Trạng thái</div>
                    <div class="ticket-value">
                        @if($booking->status === 'paid') Đã thanh toán
                        @elseif($booking->status === 'confirmed') Đã xác nhận
                        @elseif($booking->status === 'pending') Chờ thanh toán
                        @else {{ ucfirst($booking->status) }}
                        @endif
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="ticket-label">Ngày lịch trình</div>
                    <div class="ticket-value">
                        {{ $booking->check_in
                            ? \Carbon\Carbon::parse($booking->check_in)->format('d/m/Y')
                            : \Carbon\Carbon::parse($booking->booking_date)->format('d/m/Y') }}
                    </div>
                </td>
                <td>
                    <div class="ticket-label">Số lượng</div>
                    <div class="ticket-value">{{ $booking->quantity }} người</div>
                </td>
            </tr>
            @if($booking->check_out)
            <tr>
                <td>
                    <div class="ticket-label">Ngày trả phòng</div>
                    <div class="ticket-value">{{ \Carbon\Carbon::parse($booking->check_out)->format('d/m/Y') }}</div>
                </td>
                <td></td>
            </tr>
            @endif
            @if($serviceName)
            <tr>
                <td colspan="2">
                    <div class="ticket-label">Tên dịch vụ</div>
                    <div class="ticket-value">{{ $serviceName }}</div>
                </td>
            </tr>
            @endif
        </table>
    </div>

    <!-- Total -->
    <div class="total-box">
        <div class="total-label">Tổng tiền thanh toán</div>
        <div class="total-amount">{{ number_format($booking->total_amount, 0, ',', '.') }} VND</div>
    </div>

    @if($booking->note)
    <div class="section">
        <div class="section-title">Ghi chú</div>
        <p style="color:#475569; padding: 10px; background:#f8fafc; border-radius:6px; border-left: 3px solid #93c5fd;">
            {{ $booking->note }}
        </p>
    </div>
    @endif

    <!-- Footer -->
    <div class="footer">
        <strong>TravelChat SEA</strong> — Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của chúng tôi!<br>
        Hóa đơn này được tạo tự động và có giá trị xác nhận thanh toán.<br>
        Mọi thắc mắc vui lòng liên hệ: <strong>support@travelchatsea.com</strong>
    </div>

</body>
</html>
