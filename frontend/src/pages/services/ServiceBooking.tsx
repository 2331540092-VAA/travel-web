import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ServiceBooking() {
  const { id, type } = useParams();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("item_id");
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [service, setService] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/${type}s/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error(err));

    let endpoint = "";
    if (type === "hotel") endpoint = `/api/hotels/${id}/rooms`;
    if (type === "restaurant") endpoint = `/api/restaurants/${id}/tables`;
    
    if (endpoint) {
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error(err));
    }
  }, [id, type]);

  const submit = async () => {
    if (!date) {
      alert("Vui lòng chọn ngày đặt");
      return;
    }
    
    if (!itemId) {
      alert("Không xác định được phòng/bàn! Vui lòng quay lại và chọn lại.");
      return;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert("Vui lòng đăng nhập để đặt dịch vụ!");
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);

    const selectedItem = items.find((i) => i.id === Number(itemId));

    let unitPrice = 0;
    let serviceName = service?.name || "Dịch vụ";
    
    if (type === "hotel") {
      unitPrice = selectedItem?.price_per_night || service?.price_per_night || 0;
      serviceName = `${service?.name} - ${selectedItem?.name || 'Phòng'}`;
    } else {
      unitPrice = selectedItem?.price || service?.discounted_price || service?.avg_price || 0;
      serviceName = `${service?.name} - ${selectedItem?.name || 'Bàn'}`;
    }

    const totalAmount = unitPrice * quantity;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          booking_type: type, // hotel | restaurant
          target_id: itemId, // FIX: Send the specific room/table ID
          booking_date: date,
          check_in: date,
          check_out: date,
          quantity: quantity,
          total_amount: totalAmount,
          note,
          user_id: user.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Chuyển hướng đến trang thanh toán
        navigate(
          `/payment?bookingId=${data.id}&tourId=${itemId}&price=${totalAmount}&people=${quantity}&date=${date}&tourName=${encodeURIComponent(serviceName)}`
        );
      } else {
        alert("Lỗi: " + (data.message || "Lỗi đặt dịch vụ"));
        console.error(data);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Đã xảy ra lỗi hệ thống khi đặt dịch vụ.");
    }
  };

  if (!service) return <p className="text-center py-20">Loading Service...</p>;

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors shadow-sm mb-6 w-fit"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Quay lại
      </button>

      <h1 className="text-2xl font-bold mb-6">Đặt dịch vụ</h1>

      <input
        type="date"
        className="border w-full p-3 rounded mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="number"
        className="border w-full p-3 rounded mb-4"
        placeholder="Số lượng"
        value={quantity}
        min={1}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <textarea
        className="border w-full p-3 rounded mb-4"
        placeholder="Ghi chú"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Xác nhận đặt
      </button>
    </div>
  );
}
