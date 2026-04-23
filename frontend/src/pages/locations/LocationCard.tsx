import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiPost, apiGet } from "../../service/api";

export default function LocationCard({ location }: any) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      apiGet<any>(`/favorites/check?type=location&id=${location.id}&user_id=${user.id}`)
        .then((data) => setLiked(data.is_favorite))
        .catch(() => {});
    } else {
      const favs: number[] = JSON.parse(
        localStorage.getItem("favorite_locations") || "[]",
      );
      setLiked(favs.includes(location.id));
    }
  }, [location.id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      try {
        const data = await apiPost<any>("/favorites/toggle", {
          type: "location",
          id: location.id,
          user_id: user.id,
        });
        setLiked(data.is_favorite);
      } catch {}
    } else {
      let favs: number[] = JSON.parse(
        localStorage.getItem("favorite_locations") || "[]",
      );
      if (favs.includes(location.id)) {
        favs = favs.filter((id) => id !== location.id);
        setLiked(false);
      } else {
        favs.push(location.id);
        setLiked(true);
      }
      localStorage.setItem("favorite_locations", JSON.stringify(favs));
    }
  };

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

        {/* HEART */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
        >
          <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
        </button>
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
