import { useEffect, useState } from "react";
import TourCard from "./TourCard";

interface Tour {
  id: number;
  name: string;
  image_url: string;
  days?: number;
  price?: number;
  discount_percent?: number;
}

export default function TourPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tours")
      .then((res) => res.json())
      .then((data) => setTours(data.data ?? data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading tours...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tours Đông Nam Á</h1>

      {tours.length === 0 ? (
        <p className="text-gray-500">Chưa có tour</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
