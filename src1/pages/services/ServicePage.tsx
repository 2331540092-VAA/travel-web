import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: number;
  name: string;
  image_url?: string;
  rating?: number;
  price_per_night?: number;
  avg_price?: number;
}

export default function ServicePage() {
  const [hotels, setHotels] = useState<Service[]>([]);
  const [restaurants, setRestaurants] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelRes, restaurantRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/hotels"),
          fetch("http://127.0.0.1:8000/api/restaurants"),
        ]);

        const hotelJson = await hotelRes.json();
        const restaurantJson = await restaurantRes.json();

        // 👉 Chuẩn hóa dữ liệu (QUAN TRỌNG)
        const hotelData = (hotelJson.data ?? hotelJson).map((item: any) => ({
          ...item,
          image_url: item.image_url || item.image || "",
        }));

        const restaurantData = (restaurantJson.data ?? restaurantJson).map(
          (item: any) => ({
            ...item,
            image_url: item.image_url || item.image || "",
            avg_price: item.avg_price || item.min_price || 0,
          }),
        );

        setHotels(hotelData);
        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Lỗi load API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 👉 Loading đẹp hơn (giống skeleton)
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-16 pb-20">
      {/* 🔹 HOTEL */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Khách sạn</h1>
          <span className="text-sm text-gray-500">
            {hotels.length} khách sạn
          </span>
        </div>

        {hotels.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu khách sạn</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h) => (
              <ServiceCard key={`hotel-${h.id}`} data={h} type="hotel" />
            ))}
          </div>
        )}
      </section>

      {/* 🔹 RESTAURANT */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Nhà hàng</h1>
          <span className="text-sm text-gray-500">
            {restaurants.length} nhà hàng
          </span>
        </div>

        {restaurants.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu nhà hàng</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <ServiceCard
                key={`restaurant-${r.id}`}
                data={r}
                type="restaurant"
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
