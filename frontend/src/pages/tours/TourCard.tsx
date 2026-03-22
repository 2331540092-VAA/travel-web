import { Link } from "react-router-dom";

export default function TourCard({ tour }: any) {
  return (
    <Link to={`/tours/${tour.id}`}>
      <div className="border rounded-2xl overflow-hidden hover:shadow transition">
        <img
          src={tour.image_url}
          alt={tour.name}
          className="h-48 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{tour.name}</h3>

          {tour.days && (
            <p className="text-sm text-gray-600 mb-1">⏱ {tour.days} ngày</p>
          )}

          {tour.price && (
            <p className="text-sm font-semibold text-blue-600">
              {Number(tour.price).toLocaleString()} VND
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
