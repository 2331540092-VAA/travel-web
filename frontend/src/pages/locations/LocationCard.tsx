import { Link } from "react-router-dom";

export default function LocationCard({ location }: any) {
  return (
    <Link
      to={`/locations/${location.id}`}
      className="group rounded-3xl overflow-hidden bg-white shadow hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="relative h-56">
        <img
          src={location.image_url}
          alt={location.name}
          className="h-full w-full object-cover group-hover:scale-105 transition"
        />

        {/* Badge */}
        {location.tag && (
          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
            {location.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{location.name}</h3>

        <p className="text-sm text-gray-500 mb-3">{location.address}</p>

        <div className="flex gap-4 text-sm text-gray-600">
          {location.hotels_count > 0 && (
            <span>🏨 {location.hotels_count} Hotels</span>
          )}
          {location.tours_count > 0 && <span>🧭 Tours</span>}
        </div>
      </div>
    </Link>
  );
}
