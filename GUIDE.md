# 🚀 Hướng Dẫn Chạy Dự Án Khi Đổi Mạng Wi-Fi (IP Mới)

Bồ chỉ cần làm theo 4 bước sau mỗi khi mang máy tính sang quán cafe hoặc mạng Wi-Fi khác:

## Bước 1: Tìm địa chỉ IP mới của máy tính
Mở Terminal và gõ lệnh:
```bash
ipconfig getifaddr en0
```
- *Ví dụ: IP của bồ hiện tại là `192.168.123.23`*

## Bước 2: Cập nhật file `.env` (Backend)
Mở file `backend/.env` và sửa dòng sau thành IP mới:
```env
FRONTEND_URL=https://<CHÈN_IP_MỚI_VÀO_ĐÂY>:5173
```
- *Bồ chỉ cần sửa dòng này, mọi link thanh toán & email sẽ tự cập nhật theo.*

## Bước 3: Khởi động 3 cổng chính (Mở 3 tab Terminal)

### 1. Backend (Laravel)
```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8000
```

### 2. Trang Người Dùng (Frontend)
```bash
cd frontend
npm run dev
```

### 3. Trang Quản Trị (Admin)
```bash
cd admin
npm run dev
```

## Bước 4: Truy cập trên Điện thoại 📱
Dùng điện thoại bắt chung Wi-Fi với máy tính và mở trình duyệt:
- **Trang chủ:** `https://192.168.123.23:5173`
- **Trang Admin:** `https://192.168.123.23:5174` (hoặc 5175)

---

### ⚠️ LƯU Ý QUAN TRỌNG (CẦN ĐỌC):
1.  **Lỗi SSL (Camera):** Lúc vào link `https`, điện thoại sẽ báo "Kết nối không riêng tư". Bồ **BẮT BUỘC** bấm **Nâng cao (Advanced)** -> Chọn **Tiếp tục truy cập (Proceed/Unsafe)**. Nếu không làm bước này, Camera sẽ bị chặn không bật được.
2.  **Cho phép Camera:** Khi trình duyệt hỏi "Cấp quyền truy cập Camera?", hãy chọn **Allow (Cho phép)**.
3.  **n8n:** Nếu cần ghi dữ liệu vào Google Sheets, đừng quên chạy `n8n start` ở một tab Terminal khác.
4.  **ngrok (Cho VNPay):** Khi đổi Wi-Fi, ngrok **vẫn chạy tiếp** mà không cần khởi động lại. Nhưng nếu bồ lỡ tắt ngrok và bật lại mà nó cấp link mới (ví dụ: `abc.ngrok-free.dev`), hãy nhớ vào `backend/.env` cập nhật lại dòng `VNP_RETURN_URL` thì thanh toán mới thành công được.

---
*Chúc bồ báo cáo đồ án mượt mà! Nếu kẹt gì cứ gọi tui nhé. ✨*
