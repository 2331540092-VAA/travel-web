import { Link } from "react-router-dom";

interface BaseService {
  id: number;
  name: string;
  image_url?: string;
  rating?: number;
  price_per_night?: number;
  avg_price?: number;
}

interface Props {
  data: BaseService;
  type: "hotel" | "restaurant";
}

export default function ServiceCard({ data, type }: Props) {
  // 👉 Chuẩn hóa giá
  const price = type === "hotel" ? data.price_per_night : data.avg_price;

  return (
    <Link to={`/services/${type}/${data.id}`}>
      <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
        {/* IMAGE */}
        <img
          src={data.image_url || "https://via.placeholder.com/400x250"}
          alt={data.name}
          className="h-48 w-full object-cover"
        />

        {/* CONTENT */}
        <div className="p-4 space-y-2">
          {/* NAME */}
          <h3 className="font-semibold text-lg line-clamp-2">{data.name}</h3>

          {/* TYPE */}
          <p className="text-sm text-gray-500">
            {type === "hotel" ? "Khách sạn" : "Nhà hàng"}
          </p>

          {/* RATING (giống booking) */}
          {data.rating && (
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                {data.rating}
              </span>
              <span className="text-sm text-gray-500">Đánh giá</span>
            </div>
          )}

          {/* PRICE */}
          {price && (
            <p className="text-red-500 font-semibold">
              {price.toLocaleString()} VND
              {type === "hotel" && (
                <span className="text-sm text-gray-500"> / đêm</span>
              )}
            </p>
          )}

          {/* BUTTON */}
          <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Xem chi tiết
          </button>
        </div>
      </div>
    </Link>
  );
}
