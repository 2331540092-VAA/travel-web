import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ServiceBooking() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const submit = async () => {
    if (!date) {
      alert("Vui lòng chọn ngày đặt");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        booking_type: type, // hotel | restaurant
        target_id: id,
        booking_date: date,
        quantity: quantity,
        note,
        user_id: user.id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Chuyển hướng đến trang thanh toán sau khi tạo booking thành công
      navigate(
        `/payment?bookingId=${data.id}&serviceType=${type}&serviceId=${id}&date=${date}`
      );
    } else {
      alert("Lỗi: " + (data.message || "Lỗi đặt dịch vụ"));
      console.error(data);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20">
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
