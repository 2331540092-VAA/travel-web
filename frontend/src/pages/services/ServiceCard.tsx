import { Link } from "react-router-dom";

interface BaseService {
  id: number;
  name: string;
  image_url: string;
  rating?: number;
  price_per_night?: number;
  avg_price?: number;
}

interface Props {
  data: BaseService;
  type: "hotel" | "restaurant";
}

export default function ServiceCard({ data, type }: Props) {
  return (
    <Link to={`/services/${type}/${data.id}`}>
      <div className="border rounded-xl p-4 hover:shadow transition bg-white">
        <img
          src={data.image_url}
          alt={data.name}
          className="h-40 w-full object-cover rounded-lg mb-3"
        />

        <h3 className="font-semibold text-lg mb-1">{data.name}</h3>

        {data.rating && (
          <div className="text-yellow-500 text-sm mb-1">
            {"★".repeat(Math.round(data.rating))}
            <span className="text-gray-400 ml-1">({data.rating})</span>
          </div>
        )}

        {type === "hotel" && data.price_per_night && (
          <p className="text-sm text-gray-600">
            Giá từ{" "}
            <span className="font-semibold text-black">
              {data.price_per_night.toLocaleString()} VND
            </span>{" "}
            / đêm
          </p>
        )}

        {type === "restaurant" && data.avg_price && (
          <p className="text-sm text-gray-600">
            Giá trung bình{" "}
            <span className="font-semibold text-black">
              {data.avg_price.toLocaleString()} VND
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
