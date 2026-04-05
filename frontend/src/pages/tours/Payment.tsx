import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiPost } from "../../service/api";
import toast from "react-hot-toast";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("payos");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ query parameters
    const tourId = searchParams.get("tourId");
    const price = searchParams.get("price");
    const people = searchParams.get("people");
    const date = searchParams.get("date");
    const tourName = searchParams.get("tourName");

    if (tourId && price && people && date) {
      setBookingData({
        tourId,
        price: Number(price),
        people: Number(people),
        date,
        tourName,
      });
    }
  }, [searchParams]);

  const handleProcessPayment = () => {
    if (!bookingData) return;

    if (selectedMethod === "payos") {
      handlePayOSPayment();
    } else if (selectedMethod === "momo") {
      handleMomoPayment();
    } else if (selectedMethod === "card") {
      toast.error("Phương thức thanh toán bằng thẻ sắp được cập nhật!");
    } else if (selectedMethod === "bank") {
      toast.error("Phương thức chuyển khoản ngân hàng sắp được cập nhật!");
    }
  };

  const handlePayOSPayment = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      toast.loading("Đang khởi tạo thanh toán PayOS...", { id: "payment" });
      const bookingId = searchParams.get("bookingId");
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const data = await apiPost<any>("/payment/payos", {
        booking_id: bookingId,
        price: bookingData.price,
        user_id: user.id,
      });

      if (data && data.payment_url) {
        toast.success("Đang mở trang thanh toán PayOS...", { id: "payment" });
        window.open(data.payment_url, '_blank');
        setIsProcessing(false);
      } else {
        toast.error("Lỗi: Tạo link thanh toán PayOS thất bại", { id: "payment" });
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error("Lỗi thanh toán PayOS:", error);
      toast.error("Có lỗi xảy ra: " + (error.message || "Vui lòng thử lại!"), { id: "payment" });
      setIsProcessing(false);
    }
  };

  const handleMomoPayment = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      toast.loading("Đang khởi tạo thanh toán MoMo...", { id: "payment" });
      const bookingId = searchParams.get("bookingId");
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const data = await apiPost<any>("/payment/momo", {
        booking_id: bookingId,
        price: bookingData.price,
        user_id: user.id,
      });

      if (data && data.payment_url) {
        toast.success("Đang chuyển hướng sang MoMo...", { id: "payment" });
        window.location.href = data.payment_url;
        setIsProcessing(false);
      } else {
        toast.error("Lỗi: Tạo link thanh toán MoMo thất bại", { id: "payment" });
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error("Lỗi thanh toán MoMo:", error);
      toast.error("Có lỗi xảy ra: " + (error.message || "Vui lòng thử lại!"), { id: "payment" });
      setIsProcessing(false);
    }
  };


  if (!bookingData) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Thanh Toán</h1>
          <p className="text-gray-600">Chọn phương thức thanh toán của bạn</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tóm tắt đặt tour
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Tour:</span>
              <span className="font-semibold text-gray-800">
                {bookingData.tourName}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Ngày khởi hành:</span>
              <span className="font-semibold text-gray-800">
                {new Date(bookingData.date).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Số người:</span>
              <span className="font-semibold text-gray-800">
                {bookingData.people} người
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 bg-blue-50 px-4 py-3 rounded-lg">
              <span className="text-lg font-bold text-gray-800">
                Tổng tiền:
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {bookingData.price.toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Chọn phương thức thanh toán
          </h3>

          <div className="space-y-4">
            {/* PayOS */}
            <button
              onClick={() => setSelectedMethod("payos")}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-300 text-left group ${selectedMethod === "payos"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">PayOS (Chuyển khoản QR)</p>
                    <p className="text-sm text-gray-600">
                      Tạo mã QR VietQR thanh toán nhanh
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${selectedMethod === "payos"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                    }`}
                >
                  {selectedMethod === "payos" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>

            {/* MoMo */}
            <button
              onClick={() => setSelectedMethod("momo")}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-300 text-left group ${selectedMethod === "momo"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <img 
                      src="/momo_logo.png" 
                      alt="MoMo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">MoMo</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán qua ứng dụng MoMo
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${selectedMethod === "momo"
                      ? "border-pink-500 bg-pink-500"
                      : "border-gray-300"
                    }`}
                >
                  {selectedMethod === "momo" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>


            {/* Credit Card */}
            <button
              disabled
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-left group opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Thẻ Tín Dụng</p>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard (Sắp cập nhật)
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              </div>
            </button>

            {/* Bank Transfer */}
            <button
              disabled
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-left group opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏧</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-sm text-gray-600">
                      Chuyển khoản trực tiếp (Sắp cập nhật)
                    </p>
                  </div>
                </div>
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md ${isProcessing
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isProcessing ? "Đang xử lý..." : "Tiến hành thanh toán"}
            </button>

            {/* Nút Giả lập cho Dev (PayOS) */}
            {selectedMethod === "payos" && (
              <button
                onClick={async () => {
                  if (isProcessing) return;
                  setIsProcessing(true);
                  const bookingId = searchParams.get("bookingId");
                  try {
                    toast.loading("Đang giả lập thành công PayOS...", { id: "payment" });
                    await apiPost("/payment/payos-simulate", { booking_id: bookingId });
                    toast.success("Giả lập PayOS thành công!", { id: "payment" });
                    navigate("/payment-success?status=success");
                  } catch (e) {
                    toast.error("Lỗi giả lập!");
                    setIsProcessing(false);
                  }
                }}
                disabled={isProcessing}
                className="w-full py-2 border-2 border-dashed border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-all duration-300"
              >
                [DEV] Giả lập thành công PayOS
              </button>
            )}

            {/* Nút Giả lập cho Dev (MoMo) */}
            {selectedMethod === "momo" && (
              <button
                onClick={async () => {
                  if (isProcessing) return;
                  setIsProcessing(true);
                  const bookingId = searchParams.get("bookingId");
                  try {
                    toast.loading("Đang giả lập thành công MoMo...", { id: "payment" });
                    await apiPost("/payment/momo-simulate", { booking_id: bookingId });
                    toast.success("Giả lập MoMo thành công!", { id: "payment" });
                    navigate("/payment-success?status=success");
                  } catch (e) {
                    toast.error("Lỗi giả lập MoMo!");
                    setIsProcessing(false);
                  }
                }}
                disabled={isProcessing}
                className="w-full py-2 border-2 border-dashed border-pink-500 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-all duration-300"
              >
                [DEV] Giả lập thành công MoMo
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              disabled={isProcessing}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
            >
              Quay lại
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-green-800">
                Thanh toán an toàn
              </p>
              <p className="text-sm text-green-700">
                Tất cả giao dịch được mã hóa và bảo vệ bằng công nghệ SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
