import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ServiceBooking() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const submit = () => {
    fetch("http://127.0.0.1:8000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        service_type: type, // hotel | restaurant
        service_id: id,
        booking_date: date,
        note,
      }),
    }).then(() => navigate("/profile/1"));
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
