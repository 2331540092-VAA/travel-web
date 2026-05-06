<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
        <tr>
            <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:32px 40px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
                                ✈ TravelChat
                            </h1>
                            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
                                Đặt lại mật khẩu tài khoản của bạn
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px;">
                            <p style="margin:0 0 16px;color:#334155;font-size:16px;">
                                Xin chào <strong>{{ $user->name }}</strong>,
                            </p>
                            <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
                                Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
                                Nhấn vào nút bên dưới để tiến hành đặt lại mật khẩu mới.
                            </p>

                            <div style="text-align:center;margin:32px 0;">
                                <a href="{{ $resetUrl }}"
                                   style="display:inline-block;background:linear-gradient(135deg,#2563eb,#4f46e5);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:12px;font-size:15px;font-weight:800;letter-spacing:0.5px;box-shadow:0 8px 20px rgba(37,99,235,0.3);">
                                    Đặt lại mật khẩu
                                </a>
                            </div>

                            <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;">
                                Hoặc copy link sau vào trình duyệt:
                            </p>
                            <p style="margin:0 0 24px;color:#2563eb;font-size:12px;word-break:break-all;">
                                {{ $resetUrl }}
                            </p>

                            <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:8px;margin:24px 0;">
                                <p style="margin:0;color:#92400e;font-size:13px;">
                                    ⚠ Link này sẽ hết hạn sau <strong>60 phút</strong>.
                                    Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                            <p style="margin:0;color:#94a3b8;font-size:12px;">
                                © 2026 TravelChat. Không trả lời email này.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
