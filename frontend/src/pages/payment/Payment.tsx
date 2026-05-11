import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiPost } from "../../service/api";
import toast from "react-hot-toast";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("vnpay");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu từ query parameters
    const tourId = searchParams.get("tourId");
    const tourName = searchParams.get("tourName");
    const price = searchParams.get("price");
    const people = searchParams.get("people");
    const date = searchParams.get("date");
    const bookingId = searchParams.get("bookingId");
    const serviceType = searchParams.get("serviceType");
    const serviceId = searchParams.get("serviceId");
    const itemId = searchParams.get("itemId");

    // Nếu là tour
    if (tourId && price && people && date) {
      const baseData = {
        type: "tour",
        tourId,
        price: Number(price),
        people: Number(people),
        date,
        tourName: tourName || "",
      };

      if (tourName) {
        setBookingData(baseData);
        console.log("[Payment] bookingData (tour):", baseData);
      } else {
        // tourName bị thiếu → fetch tên tour từ API
        const apiBase = import.meta.env.VITE_API_BASE
          ? import.meta.env.VITE_API_BASE + "/api"
          : "http://127.0.0.1:8000/api";
        fetch(`${apiBase}/tours/${tourId}`)
          .then((res) => res.json())
          .then((tour) => {
            const dataWithName = { ...baseData, tourName: tour.name || "" };
            setBookingData(dataWithName);
            console.log("[Payment] bookingData (tour, fetched name):", dataWithName);
          })
          .catch(() => {
            setBookingData(baseData);
          });
      }
      return;
    }

    // Nếu là dịch vụ (hotel/restaurant)
    if (bookingId && price && people && date && serviceType && serviceId) {
      const baseData = {
        type: serviceType,
        bookingId,
        price: Number(price),
        people: Number(people),
        date,
        serviceId,
        itemId,
        serviceName: "",
        itemName: "",
      };
      setBookingData(baseData);

      // Fetch tên dịch vụ (hotel / restaurant)
      const apiBase = import.meta.env.VITE_API_BASE
        ? import.meta.env.VITE_API_BASE + "/api"
        : "http://127.0.0.1:8000/api";

      const endpoint = serviceType === "hotel" ? "hotels" : "restaurants";
      const itemEndpoint = serviceType === "hotel" ? "rooms" : "tables";

      Promise.all([
        fetch(`${apiBase}/${endpoint}/${serviceId}`).then((r) => r.json()),
        itemId
          ? fetch(`${apiBase}/${endpoint}/${serviceId}/${itemEndpoint}`).then((r) => r.json())
          : Promise.resolve([]),
      ])
        .then(([serviceData, itemsData]) => {
          const serviceName = serviceData?.name || "";
          const items = Array.isArray(itemsData) ? itemsData : [];
          const matchedItem = items.find((it: any) => String(it.id) === String(itemId));
          const itemName = matchedItem?.name || "";
          setBookingData((prev: any) => ({ ...prev, serviceName, itemName }));
        })
        .catch(() => {/* giữ nguyên nếu lỗi */});

      return;
    }

    // Nếu không đủ params
    console.warn("[Payment] Thiếu query params", {
      tourId,
      price,
      people,
      date,
      tourName,
      bookingId,
      serviceType,
      serviceId,
      itemId,
    });
  }, [searchParams]);

  const handleProcessPayment = () => {
    if (!bookingData) return;

    if (selectedMethod === "vnpay") {
      handleVNPayPayment();
    } else if (selectedMethod === "momo") {
      handleMoMoPayment();
    } else if (selectedMethod === "bank") {
      toast.error("Phương thức chuyển khoản ngân hàng sắp được cập nhật!");
    }
  };

  const handleVNPayPayment = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      toast.loading("Đang khởi tạo thanh toán VNPay...", { id: "payment" });
      const bookingId = searchParams.get("bookingId");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("[Payment] Gọi API /payment/create", {
        bookingId,
        user,
        bookingData,
      });

      const data = await apiPost<any>("/payment/create", {
        booking_id: bookingId,
        price: bookingData.price,
        user_id: user.id,
      });

      console.log("[Payment] Kết quả API /payment/create:", data);

      if (data && data.payment_url) {
        // Lưu query params để retry nếu thanh toán thất bại
        sessionStorage.setItem("paymentRetryParams", searchParams.toString());
        toast.success("Chuyển hướng VNPay...", { id: "payment" });
        window.location.href = data.payment_url;
      } else {
        toast.error("Lỗi: Tạo link thanh toán thất bại", { id: "payment" });
        setIsProcessing(false);
      }
    } catch (error: unknown) {
      console.error("Lỗi thanh toán VNPay:", error);
      toast.error("Có lỗi xảy ra: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), {
        id: "payment",
      });
      setIsProcessing(false);
    }
  };

  const handleMoMoPayment = async () => {
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      toast.loading("Đang khởi tạo thanh toán MoMo...", { id: "payment" });
      const bookingId = searchParams.get("bookingId");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const data = await apiPost<any>("/payment/momo", {
        booking_id: bookingId,
        price: bookingData.price,
        user_id: user.id,
      });

      if (data && data.payment_url) {
        // Lưu query params để retry nếu thanh toán thất bại
        sessionStorage.setItem("paymentRetryParams", searchParams.toString());
        toast.success("Chuyển hướng MoMo...", { id: "payment" });
        window.location.href = data.payment_url;
      } else {
        toast.error("Lỗi: Tạo link thanh toán MoMo thất bại", { id: "payment" });
        setIsProcessing(false);
      }
    } catch (error: unknown) {
      console.error("Lỗi thanh toán MoMo:", error);
      toast.error("Có lỗi xảy ra: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), {
        id: "payment",
      });
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
            {bookingData.type === "tour"
              ? "Tóm tắt đặt tour"
              : bookingData.type === "hotel"
                ? "Tóm tắt đặt phòng khách sạn"
                : bookingData.type === "restaurant"
                  ? "Tóm tắt đặt bàn nhà hàng"
                  : "Tóm tắt đặt dịch vụ"}
          </h2>

          <div className="space-y-4 mb-6">
            {bookingData.type === "tour" ? (
              <>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Tour:</span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.tourName}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">
                    {bookingData.type === "hotel" ? "Khách sạn:" : "Nhà hàng:"}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {bookingData.serviceName || bookingData.serviceId}
                  </span>
                </div>
                {bookingData.itemId && (
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">
                      {bookingData.type === "hotel" ? "Phòng:" : "Bàn:"}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {bookingData.itemName || bookingData.itemId}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Ngày sử dụng:</span>
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
            {/* VNPay */}
            <button
              onClick={() => setSelectedMethod("vnpay")}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-300 text-left group ${
                selectedMethod === "vnpay"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">VNPay</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán qua cổng VNPay
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    selectedMethod === "vnpay"
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedMethod === "vnpay" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>

            {/* MoMo */}
            <button
              onClick={() => setSelectedMethod("momo")}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-300 text-left group ${
                selectedMethod === "momo"
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">MoMo</p>
                    <p className="text-sm text-gray-600">
                      Thanh toán qua ví MoMo
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    selectedMethod === "momo"
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
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md ${
                isProcessing
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing ? "Đang xử lý..." : "Tiến hành thanh toán"}
            </button>

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
              <p className="font-semibold text-green-800">Thanh toán an toàn</p>
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
