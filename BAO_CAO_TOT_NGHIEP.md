# BÁO CÁO THỰC TẬP TỐT NGHIỆP

## MỞ ĐẦU
Trong kỷ nguyên số, ngành du lịch đã có những bước chuyển mình mạnh mẽ nhờ sự hỗ trợ của công nghệ thông tin. Việc xây dựng một nền tảng trực tuyến cho phép người dùng tìm kiếm, trải nghiệm và đặt các dịch vụ du lịch (khách sạn, tour, nhà hàng) một cách nhanh chóng và an toàn là nhu cầu thiết yếu. Đề tài **"Xây dựng Hệ thống Quản lý và Đặt dịch vụ Du lịch trực tuyến"** tập trung vào việc phát triển một ứng dụng web toàn diện, tích hợp các công nghệ hiện đại và giải pháp thanh toán điện tử, nhằm tối ưu hóa trải nghiệm người dùng và nâng cao hiệu quả quản lý dịch vụ du lịch.

---

## CHƯƠNG 1. GIỚI THIỆU

### 1.1. Lý do chọn đề tài
Hiện nay, nhu cầu du lịch và khám phá của người dân ngày càng tăng cao, kéo theo sự bùng nổ của các dịch vụ lưu trú và lữ hành. Tuy nhiên, việc tìm kiếm thông tin lẻ tẻ trên nhiều nền tảng khác nhau thường gây mất thời gian và khó khăn trong việc đối chiếu giá cả cũng như độ uy tín của dịch vụ.

Xuất phát từ tình hình thực tế này, nhu cầu về một hệ thống "tất cả trong một" (all-in-one) trở nên vô cùng cấp thiết. Bài toán đặt ra là làm thế nào để kết nối các nhà cung cấp dịch vụ du lịch với du khách một cách hiệu quả và minh bạch nhất. Nếu bài toán này được giải quyết, nó không chỉ đem lại sự tiện lợi, an tâm cho khách hàng thông qua các giao dịch trực tuyến an toàn, mà còn giúp các doanh nghiệp du lịch tiếp cận tệp khách hàng rộng lớn hơn, chuyển đổi mô hình kinh doanh sang hướng hiện đại và bền vững. Ngoài ra, giải pháp quản lý này còn có thể mở rộng áp dụng cho các lĩnh vực dịch vụ khác như đặt lịch sự kiện hay cho thuê bất động sản.

**Lưu ý:** Phần này chỉ tập trung vào sự cấp thiết của đề tài và các lợi ích mang lại, không đề cập đến chi tiết giải pháp kỹ thuật.

### 1.2. Mục tiêu đề tài
- **Hệ thống làm gì và làm cho ai?**
    - Hệ thống cung cấp nền tảng trực tuyến cho phép người dùng (du khách) tìm kiếm, xem thông tin chi tiết về các quốc gia, địa điểm du lịch, tour du lịch, khách sạn và nhà hàng.
    - Hệ thống hỗ trợ người dùng thực hiện đặt chỗ trực tuyến và thực hiện thanh toán qua cổng điện tử VNPay.
    - Đối tượng hướng đến là du khách trong và ngoài nước, cũng như những người quản trị hệ thống muốn số hóa quy trình vận hành dịch vụ du lịch.

- **Kết quả cần đạt được:**
    - **Về hệ thống ứng dụng:** Hoàn thiện một ứng dụng web có giao diện thân thiện, dễ sử dụng, cấu trúc chuẩn hóa, hỗ trợ đầy đủ các tính năng từ tìm kiếm, booking đến quản lý lịch sử giao dịch và hồ sơ cá nhân.
    - **Về công nghệ ứng dụng:** Áp dụng hiệu quả framework Laravel (PHP) cho backend; React cho frontend; hệ quản trị cơ sở dữ liệu PostgreSQL; tích hợp cổng thanh toán VNPay và xác thực người dùng qua Google OAuth.

### 1.3. Phạm vi đề tài
- **Không gian nghiên cứu:** Triển khai trên môi trường web, cho phép truy cập từ mọi thiết bị có kết nối Internet.
- **Thời gian thực hiện:** Trong khuôn khổ kỳ thực tập tốt nghiệp.
- **Lĩnh vực nghiên cứu:** Thương mại điện tử (E-commerce) và Công nghệ thông tin ứng dụng trong ngành Du lịch và Dịch vụ (Tourism & Hospitality Tech).
- **Phạm vi chức năng:** Tập trung vào các quy trình cốt lõi bao gồm:
    - Quản lý danh mục (Quốc gia, Điểm đến, Loại hình dịch vụ).
    - Quy trình đặt chỗ (Booking) cho 3 loại hình chính: Khách sạn, Nhà hàng và Tour du lịch.
    - Quy trình thanh toán điện tử (VNPay).
    - Quản lý người dùng và phân quyền truy cập.
