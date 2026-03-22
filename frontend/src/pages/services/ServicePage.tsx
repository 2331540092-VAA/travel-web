import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: number;
  name: string;
  image_url: string;
  rating?: number;
  price_per_night?: number;
  avg_price?: number;
}

export default function ServicePage() {
  const [hotels, setHotels] = useState<Service[]>([]);
  const [restaurants, setRestaurants] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/hotels").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/restaurants").then((res) => res.json()),
    ])
      .then(([h, r]) => {
        setHotels(h.data ?? h);
        setRestaurants(r.data ?? r);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-20 pb-20">
      <section>
        <h1 className="text-3xl font-bold mb-6">Khách sạn</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((h) => (
            <ServiceCard key={h.id} data={h} type="hotel" />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-6">Nhà hàng</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <ServiceCard key={r.id} data={r} type="restaurant" />
          ))}
        </div>
      </section>
    </div>
  );
}
