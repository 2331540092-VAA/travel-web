<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Xác nhận đặt dịch vụ thành công</title>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; }
        .container { background-color: #ffffff; width: 90%; max-width: 600px; margin: 30px auto; padding: 0; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; line-height: 1.6; color: #333333; }
        .content p { margin: 10px 0; }
        .footer { background-color: #f8fafc; text-align: center; padding: 15px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; }
        .details-table th, .details-table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
        .details-table th { background-color: #f1f5f9; width: 40%; font-weight: 600; color: #475569; }
        .status-paid { color: #16a34a; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Xác nhận đặt dịch vụ thành công!</h2>
        </div>
        <div class="content">
            <p>Xin chào <strong>{{ $booking->user->name }}</strong>,</p>
            <p>Cảm ơn bạn đã tin tưởng và chọn Travel SE Asia. Chúng tôi xin xác nhận dịch vụ của bạn đã được thanh toán thành công. Dưới đây là thông tin chi tiết đơn hàng của bạn:</p>

            <table class="details-table">
                <tr>
                    <th>Mã Booking</th>
                    <td>#{{ $booking->id }}</td>
                </tr>
                <tr>
                    <th>Loại dịch vụ</th>
                    <td>{{ ucfirst($booking->booking_type) }}</td>
                </tr>
                @if($booking->booking_type === 'tour' && $tour)
                <tr>
                    <th>Tên Tour</th>
                    <td>{{ $tour->name }}</td>
                </tr>
                @endif
                @if($booking->check_in)
                <tr>
                    <th>Ngày Bắt đầu (Check-in)</th>
                    <td>{{ \Carbon\Carbon::parse($booking->check_in)->format('d/m/Y') }}</td>
                </tr>
                @endif
                @if($booking->check_out)
                <tr>
                    <th>Ngày Kết thúc (Check-out)</th>
                    <td>{{ \Carbon\Carbon::parse($booking->check_out)->format('d/m/Y') }}</td>
                </tr>
                @endif
                <tr>
                    <th>Số lượng</th>
                    <td>{{ $booking->quantity }}</td>
                </tr>
                <tr>
                    <th>Tổng tiền</th>
                    <td>{{ number_format($booking->total_amount, 0, ',', '.') }} VNĐ</td>
                </tr>
                <tr>
                    <th>Trạng thái thanh toán</th>
                    <td class="status-paid">Đã thanh toán (VNPay)</td>
                </tr>
            </table>

            <p>Nếu bạn có bất kỳ thắc mắc nào về thông tin đặt dịch vụ, xin vui lòng phản hồi lại email này để được bộ phận CSKH hỗ trợ kịp thời.</p>
            <p>Chúc bạn có một trải nghiệm thật tuyệt vời!</p>
            <p>Trân trọng,<br><strong>Đội ngũ Travel SE Asia</strong></p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Travel SE Asia. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
