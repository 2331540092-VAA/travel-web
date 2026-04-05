import { Link } from "react-router-dom";

interface LocationCardProps {
  location: any;
  showHeart?: boolean;
}

export default function LocationCard({ location, showHeart = false }: LocationCardProps) {
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

        {/* Heart icon overlay */}
        {showHeart && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow">
            <svg
              className="w-5 h-5 text-red-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}

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
