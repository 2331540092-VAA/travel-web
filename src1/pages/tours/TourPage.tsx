import { useEffect, useState } from "react";
import TourCard from "./TourCard";

interface Tour {
  id: number;
  name: string;
  image_url: string;
  days?: number;
  price?: number;
  discount_percent?: number;
  departures?: any[];
  departure_location?: string;
  transport?: string;
}

export default function TourPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data.data ?? data))
      .finally(() => setLoading(false));
  }, []);

  // Lọc tour
  let filteredTours = tours;
  if (filter === "good-price") {
    filteredTours = filteredTours.filter(
      (tour) => tour.discount_percent && tour.discount_percent > 0,
    );
  } else if (filter === "early-departure") {
    filteredTours = filteredTours.filter(
      (tour) =>
        tour.departures &&
        tour.departures.length > 0 &&
        tour.departures[0]?.date &&
        new Date(tour.departures[0].date) > new Date(),
    );
  }

  // Sắp xếp tour
  if (sort === "price-asc") {
    filteredTours = [...filteredTours].sort(
      (a, b) => (a.price ?? 0) - (b.price ?? 0),
    );
  } else if (sort === "price-desc") {
    filteredTours = [...filteredTours].sort(
      (a, b) => (b.price ?? 0) - (a.price ?? 0),
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          🌏 Tour du lịch nổi bật
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Khám phá các tour hot với giá ưu đãi
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="text-gray-500 animate-pulse">Đang tải tour...</span>
        </div>
      ) : filteredTours.length === 0 ? (
        <p className="text-center text-gray-500 py-20">Chưa có tour nào</p>
      ) : (
        <>
          {/* FILTER BAR */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-full ${filter === "all" ? "bg-blue-600 text-white" : "border hover:bg-gray-100"}`}
                onClick={() => setFilter("all")}
              >
                Tất cả
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full ${filter === "good-price" ? "bg-blue-600 text-white" : "border hover:bg-gray-100"}`}
                onClick={() => setFilter("good-price")}
              >
                Giá tốt
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-full ${filter === "early-departure" ? "bg-blue-600 text-white" : "border hover:bg-gray-100"}`}
                onClick={() => setFilter("early-departure")}
              >
                Khởi hành sớm
              </button>
            </div>

            <select
              className="border px-3 py-1.5 rounded text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>

          {/* LIST TOUR */}
          <div className="flex flex-col gap-5">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
