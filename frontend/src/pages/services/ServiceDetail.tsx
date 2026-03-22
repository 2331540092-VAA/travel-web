import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ServiceDetail() {
  const { id, type } = useParams();
  const [service, setService] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!id || !type) return;

    // 1. Lấy thông tin hotel / restaurant
    fetch(`http://127.0.0.1:8000/api/${type}s/${id}`)
      .then((res) => res.json())
      .then(setService);

    // 2. Lấy phòng hoặc bàn
    let endpoint = "";

    if (type === "hotel") {
      endpoint = `http://127.0.0.1:8000/api/hotels/${id}/rooms`;
    }

    if (type === "restaurant") {
      endpoint = `http://127.0.0.1:8000/api/restaurants/${id}/tables`;
    }

    if (endpoint) {
      fetch(endpoint)
        .then((res) => res.json())
        .then(setItems);
    }
  }, [id, type]);

  if (!service) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      {/* IMAGE */}
      <img
        src={service.image_url}
        alt={service.name}
        className="w-full h-[420px] object-cover rounded-3xl mb-8"
      />

      {/* INFO */}
      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>

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
                <p className="text-2xl font-bold mb-3">
                  {Number(
                    type === "hotel" ? item.price_per_night : item.price,
                  ).toLocaleString()}{" "}
                  VND
                </p>

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
