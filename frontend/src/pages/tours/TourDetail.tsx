import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../service/api";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";
import { MapPin, CalendarDays, Clock, Users, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface TourSchedule {
  id: number;
  day_number: number;
  title: string;
  activity: string;
}

interface TourDeparture {
  id: number;
  departure_date: string;
  capacity: number;
  booked: number;
  price: string;
  discount_percent: number;
  status: string;
}

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<TourDeparture | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [manualDate, setManualDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiGet<any>(`/tours/${id}`)
      .then((data) => {
        const tourData = data.data || data;
        setTour(tourData);
        if (tourData.departures?.length > 0) {
          const available = tourData.departures.find((d: TourDeparture) => d.status === "available");
          if (available) setSelectedDeparture(available);
        }
      })
      .catch(() => {
        toast.error("Không thể tải thông tin tour.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const handleBooking = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      toast.error("Vui lòng đăng nhập để tiếp tục đặt tour!");
      navigate("/login");
      return;
    }

    let finalDate = "";
    if (tour.departures && tour.departures.length > 0) {
      if (!selectedDeparture) {
        toast.error("Vui lòng chọn ngày khởi hành.");
        return;
      }
      finalDate = selectedDeparture.departure_date;
    } else {
      if (!manualDate) {
        toast.error("Vui lòng chọn ngày khởi hành.");
        return;
      }
      finalDate = manualDate;
    }

    const user = JSON.parse(userStr);
    const price = finalPrice * quantity;
    
    setBookingLoading(true);

    try {
      const data = await apiPost<any>("/bookings", {
        booking_type: "tour",
        target_id: id,
        booking_date: finalDate,
        quantity: quantity,
        total_amount: price,
        user_id: user.id,
      });

      if (data && data.id) {
        toast.success("Khởi tạo đơn đặt tour thành công!");
        navigate(
          `/payment?bookingId=${data.id}&tourId=${id}&price=${price}&people=${quantity}&date=${finalDate}&tourName=${encodeURIComponent(tour.name)}`
        );
      } else {
        toast.error(data.message || "Không thể đặt tour lúc này.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi hệ thống khi đặt tour.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading || !tour) {
    return <Loader text="Đang tải chi tiết tour..." />;
  }

  const originalPrice = selectedDeparture ? Number(selectedDeparture.price) : Number(tour.price);
  const discountPercent = selectedDeparture ? selectedDeparture.discount_percent : (tour.discount_percent || 0);
  const finalPrice = discountPercent > 0
    ? originalPrice * (1 - discountPercent / 100)
    : originalPrice;
    
  const remainingSeats = selectedDeparture
    ? selectedDeparture.capacity - selectedDeparture.booked
    : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-slate-900">
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Quay lại
          </button>
        </div>
        <img
          src={tour.image_url}
          alt={tour.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-12">
          {tour.location && (
            <div className="inline-flex items-center gap-2 bg-blue-600/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4" />
              {tour.location.name} {tour.location.country ? `, ${tour.location.country.name}` : ""}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {tour.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-200 font-medium">
            {tour.days && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>{tour.days} Ngày {tour.days - 1 > 0 ? (tour.days - 1) + " Đêm" : ""}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Hoàn huỷ miễn phí</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COLUMN: Details */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Description */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tổng quan</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tour.description || "Chưa có thông tin mô tả chi tiết cho tour này."}
              </p>
            </section>

            {/* Departures Selection */}
            {tour.departures && tour.departures.length > 0 && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-blue-500" />
                  Chọn ngày khởi hành
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {tour.departures
                    .filter((d: TourDeparture) => d.status === "available")
                    .map((dep: TourDeparture) => {
                      const isSelected = selectedDeparture?.id === dep.id;
                      return (
                        <button
                          key={dep.id}
                          onClick={() => setSelectedDeparture(dep)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50/50 shadow-sm"
                              : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className={`text-lg font-bold ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                            {new Date(dep.departure_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                          </span>
                          <span className={`text-xs mt-1 ${isSelected ? "text-blue-500" : "text-slate-400"}`}>
                            {new Date(dep.departure_date).toLocaleDateString("vi-VN", { year: "numeric" })}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </section>
            )}

            {/* Schedule Accordion */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-500" />
                Lịch trình chi tiết
              </h2>

              {tour.schedules && tour.schedules.length > 0 ? (
                <div className="space-y-4">
                  {tour.schedules
                    .sort((a: TourSchedule, b: TourSchedule) => a.day_number - b.day_number)
                    .map((s: TourSchedule) => {
                      const isExpanded = expandedDays.has(s.day_number);
                      return (
                        <div key={s.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => toggleDay(s.day_number)}
                            className={`w-full flex items-center justify-between p-5 transition-colors duration-300 ${isExpanded ? "bg-blue-50" : "bg-white hover:bg-slate-50"}`}
                          >
                            <div className="flex items-center gap-4 text-left">
                              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${isExpanded ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                                D{s.day_number}
                              </div>
                              <span className={`font-semibold text-lg ${isExpanded ? "text-blue-900" : "text-slate-800"}`}>
                                {s.title}
                              </span>
                            </div>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                          </button>

                          <div className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                            <div className="p-6 bg-white border-t border-slate-100 text-slate-600 leading-relaxed whitespace-pre-line">
                              {s.activity || "Hoạt động tự do."}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl">
                  Chưa có lịch trình chi tiết cho tour này.
                </div>
              )}
            </section>

          </div>

          {/* RIGHT COLUMN: Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <div className="mb-6">
                <span className="text-slate-500 font-medium block mb-2">Giá ưu đãi</span>
                <div className="flex items-end gap-3 flex-wrap">
                  <span className="text-4xl font-extrabold text-red-500 tracking-tight">
                    {formatPrice(finalPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-lg text-slate-400 line-through font-medium mb-1">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg mt-3">
                    Tiết kiệm {discountPercent}% hôm nay
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {/* Date Selection Display or Manual Input */}
                {tour.departures && tour.departures.length > 0 ? (
                  selectedDeparture ? (
                    <>
                      <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-500 flex items-center gap-2"><CalendarDays className="w-4 h-4"/> Ngày khởi hành</span>
                        <span className="font-semibold text-slate-800">
                          {new Date(selectedDeparture.departure_date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      {remainingSeats !== null && (
                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                          <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4"/> Số chỗ trống</span>
                          <span className={`font-semibold ${remainingSeats < quantity ? "text-red-500" : "text-green-600"}`}>
                            {remainingSeats} chỗ
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-4 text-center text-sm font-medium text-orange-500 bg-orange-50 rounded-xl">
                      Vui lòng chọn ngày khởi hành ở lịch trên để tiếp tục
                    </div>
                  )
                ) : (
                  <div className="py-3 border-b border-slate-100">
                    <label className="text-slate-500 flex items-center gap-2 mb-2"><CalendarDays className="w-4 h-4"/> Chọn ngày</label>
                    <input 
                      type="date" 
                      value={manualDate} 
                      onChange={(e) => setManualDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Quantity Input */}
                <div className="py-3 border-b border-slate-100">
                  <label className="text-slate-500 flex items-center gap-2 mb-2"><Users className="w-4 h-4"/> Số khách</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 bg-white shadow-sm"
                    >
                      -
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => {
                        if (remainingSeats !== null && quantity >= remainingSeats) {
                          toast.error("Đã đạt giới hạn số chỗ trống!");
                          return;
                        }
                        setQuantity(quantity + 1);
                      }}
                      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 bg-white shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-500 font-medium">Tổng thanh toán:</span>
                  <span className="text-2xl font-bold text-red-500">{formatPrice(finalPrice * quantity)}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading || (tour.departures && tour.departures.length > 0 && !selectedDeparture) || (remainingSeats !== null && remainingSeats <= 0) || (tour.departures?.length === 0 && !manualDate)}
                className="w-full bg-slate-900 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex justify-center items-center"
              >
                {bookingLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : "Tiếp tục đặt tour"}
              </button>

              <div className="mt-6 space-y-3 text-sm text-slate-500">
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  Xác nhận ngay lập tức
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  Hỗ trợ tư vấn khách hàng 24/7
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
