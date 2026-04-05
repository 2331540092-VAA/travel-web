import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiGet } from "../../service/api";
import Loader from "../../components/common/Loader";
import { MapPin, CalendarDays, Clock, Filter, ArrowDownUp } from "lucide-react";

interface Tour {
  id: number;
  name: string;
  image_url: string;
  days?: number;
  price?: number;
  discount_percent?: number;
  location?: {
    id: number;
    name: string;
    country?: { name: string };
  };
  departures?: Array<{
    id: number;
    departure_date: string;
    status: string;
  }>;
}

type FilterTab = "all" | "best_price" | "earliest";
type SortOption = "default" | "price_asc" | "price_desc";

export default function TourPage() {
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get("location")?.toLowerCase() || "";
  const searchDate = searchParams.get("date") || "";

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    apiGet<any>("/tours")
      .then((data) => {
        const arrayData = Array.isArray(data) ? data : data.data || [];
        setTours(arrayData);
      })
      .finally(() => setLoading(false));
  }, []);

  const getFilteredTours = () => {
    let result = [...tours];

    if (searchLocation) {
      result = result.filter(t => 
        t.location?.name.toLowerCase().includes(searchLocation) ||
        t.name.toLowerCase().includes(searchLocation)
      );
    }

    if (searchDate) {
      result = result.filter(t =>
        t.departures?.some(d => d.departure_date.startsWith(searchDate) && d.status === "available")
      );
    }

    if (activeFilter === "best_price") {
      result = result
        .filter((t) => t.discount_percent && t.discount_percent > 0)
        .sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (activeFilter === "earliest") {
      result = result.filter(
        (t) =>
          t.departures &&
          t.departures.some((d) => d.status === "available")
      );
    }

    if (sortBy === "price_asc") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  };

  const filteredTours = getFilteredTours();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100);
  };

  if (loading) return <Loader text="Đang tải danh sách tour..." />;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white py-16 px-4 md:px-0 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Khám phá thế giới</h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl">
            Lựa chọn từ hàng trăm tour du lịch chất lượng cao với mức giá ưu đãi nhất dành riêng cho bạn.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Toolbar: Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
            {[
              { key: "all" as FilterTab, label: "Tất cả tour" },
              { key: "best_price" as FilterTab, label: "Giá tốt nhất" },
              { key: "earliest" as FilterTab, label: "Khởi hành sớm" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === tab.key
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowDownUp className="w-5 h-5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex-1 md:flex-none border-none bg-slate-100 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
            >
              <option value="default">Mặc định</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* Tour List */}
        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy tour phù hợp</h3>
            <p className="text-slate-500">Vui lòng thử nghiệm bộ lọc hoặc tiêu chí tìm kiếm khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => {
              const hasDiscount = tour.discount_percent ? tour.discount_percent > 0 : false;
              const finalPrice = hasDiscount
                ? getDiscountedPrice(tour.price || 0, tour.discount_percent!)
                : tour.price || 0;

              return (
                <div
                  key={tour.id}
                  className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={tour.image_url}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    {hasDiscount ? (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-md">
                        Tiết kiệm {tour.discount_percent}%
                      </div>
                    ) : null}
                    {tour.location && (
                      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                        <MapPin className="w-3.5 h-3.5" />
                        {tour.location.name}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {tour.name}
                    </h3>

                    <div className="space-y-3 mb-6 flex-1">
                      {tour.days && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>Thời gian: {tour.days} Ngày {tour.days - 1 > 0 ? (tour.days - 1) + " Đêm" : ""}</span>
                        </div>
                      )}
                      {tour.departures && tour.departures.some(d => d.status === "available") && (
                        <div className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                          <CalendarDays className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div className="flex flex-wrap gap-1.5">
                            {tour.departures
                              .filter((d) => d.status === "available")
                              .slice(0, 3)
                              .map((dep) => (
                                <span
                                  key={dep.id}
                                  className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-lg text-xs"
                                >
                                  {new Date(dep.departure_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex items-end justify-between mt-auto">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block mb-1">Giá chỉ từ</span>
                        <div className="flex flex-col">
                          {hasDiscount ? (
                            <span className="text-sm text-slate-400 line-through font-medium">
                              {formatPrice(tour.price || 0)}
                            </span>
                          ) : null}
                          <span className="text-xl font-extrabold text-red-500 tracking-tight">
                            {formatPrice(finalPrice)}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/tours/${tour.id}`}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors duration-300"
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
