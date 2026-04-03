import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WeatherWidget from "../../components/common/WeatherWidget";
import { apiGet } from "../../service/api";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
export default function ServiceDetail() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!id || !type) return;

    // 1. Lấy thông tin hotel / restaurant
    apiGet<any>(`/${type}s/${id}`)
      .then((data) => setService(data.data ?? data))
      .catch((err) => console.error(err));

    // 2. Lấy phòng hoặc bàn
    let endpoint = "";

    if (type === "hotel") {
      endpoint = `/hotels/${id}/rooms`;
    }

    if (type === "restaurant") {
      endpoint = `/restaurants/${id}/tables`;
    }

    if (endpoint) {
      apiGet<any>(endpoint)
        .then((data) => setItems(data.data ?? data))
        .catch((err) => console.error(err));
    }
  }, [id, type]);

  if (!service) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 pt-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors shadow-sm mb-6 w-fit"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Quay lại
      </button>

      {/* IMAGE */}
      <img
        src={service.image_url}
        alt={service.name}
        className="w-full h-[420px] object-cover rounded-3xl mb-8 shadow-md"
      />

      {/* INFO */}
      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>

      {/* THỜI TIẾT TRỰC TIẾP */}
      {(service.lat && service.lng) && (
        <WeatherWidget lat={service.lat} lng={service.lng} />
      )}

      {service.address && (
        <p className="text-gray-500 mb-2">{service.address}</p>
      )}

      {service.rating && (
        <p className="text-yellow-500 mb-6">⭐ {service.rating}</p>
      )}

      {/* DESCRIPTION */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2">
          {type === "hotel" ? "Mô tả khách sạn" : "Giới thiệu nhà hàng"}
        </h2>
        <p className="text-gray-700">{service.description}</p>
      </div>

      {/* ROOMS / TABLES */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {type === "hotel" ? "Danh sách phòng" : "Danh sách bàn"}
        </h2>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6"
            >
              {/* LEFT */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>

                <p className="text-gray-600">Sức chứa: {item.capacity} người</p>

                <p className="text-gray-600">
                  Còn lại: {item.quantity}
                  {type === "hotel" ? " phòng" : " bàn"}
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                {type === "hotel" ? (
                  <p className="text-2xl font-bold mb-3 text-orange-600">
                    {Number(item.price_per_night).toLocaleString('vi-VN')} VNĐ
                  </p>
                ) : (
                  <p className="text-2xl font-bold mb-3 text-orange-600">
                    {Number(service.discounted_price || service.avg_price || 0).toLocaleString('vi-VN')} VNĐ
                  </p>
                )}

                <Link
                  to={`/services/${type}/${id}/book?item_id=${item.id}`}
                  className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600"
                >
                  {type === "hotel" ? "Đặt phòng" : "Đặt bàn"}
                </Link>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-gray-500">
              {type === "hotel"
                ? "Khách sạn hiện chưa có phòng."
                : "Nhà hàng hiện chưa có bàn."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
