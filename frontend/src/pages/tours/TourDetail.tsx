import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<any>(null);

  // booking form
  const [bookingDate, setBookingDate] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/tours/${id}`)
      .then((res) => res.json())
      .then(setTour);
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const totalAmount = tour.price * people;

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        booking_type: "tour",
        target_id: id,
        booking_date: bookingDate,
        quantity: people,
        total_amount: totalAmount,
        user_id: user.id,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      // Chuyển hướng đến trang thanh toán sau khi tạo booking thành công
      navigate(
        `/payment?bookingId=${data.id}&tourId=${id}&price=${totalAmount}&people=${people}&date=${bookingDate}&tourName=${encodeURIComponent(
          tour.name
        )}`
      );
    } else {
      const data = await res.json();
      alert("Lỗi: " + (data.message || "Lỗi đặt tour"));
      console.error(data);
    }

    setLoading(false);
  };

  if (!tour) {
    return <p className="text-center py-20">Loading tour...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* IMAGE */}
      <img
        src={tour.image_url}
        className="w-full h-[420px] object-cover rounded-3xl mb-8"
        alt={tour.name}
      />

      {/* INFO */}
      <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>

      {tour.days && (
        <p className="text-gray-600 mb-2">Thời gian: {tour.days} ngày</p>
      )}

      {tour.price && (
        <p className="text-xl font-semibold text-blue-600 mb-6">
          Giá: {Number(tour.price).toLocaleString()} VND / người
        </p>
      )}

      <p className="text-gray-700 mb-10">{tour.description}</p>

      {/* ===== TOUR SCHEDULE ===== */}
      <h2 className="text-2xl font-semibold mb-6">Lịch trình tour</h2>

      {tour.schedules && tour.schedules.length > 0 ? (
        <div className="space-y-6 mb-14">
          {tour.schedules
            .sort((a: any, b: any) => a.day_number - b.day_number)
            .map((s: any) => (
              <div key={s.id} className="border rounded-2xl p-6 bg-white">
                <h3 className="text-lg font-semibold mb-2">
                  Ngày {s.day_number}: {s.title}
                </h3>

                {s.activity && (
                  <p className="text-gray-700 whitespace-pre-line">
                    {s.activity}
                  </p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-10">Chưa có lịch trình cho tour này</p>
      )}

      {/* ===== BOOKING FORM ===== */}
      <div className="border rounded-3xl p-8 bg-gray-50 max-w-xl">
        <h2 className="text-2xl font-semibold mb-6">Đăng ký tour</h2>

        {success ? (
          <p className="text-green-600 font-medium">
            🎉 Đặt tour thành công! Vui lòng kiểm tra lịch sử đặt tour.
          </p>
        ) : (
          <form onSubmit={handleBooking} className="space-y-5">
            {/* DATE */}
            <div>
              <label className="block mb-1 font-medium">Ngày khởi hành</label>
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* PEOPLE */}
            <div>
              <label className="block mb-1 font-medium">Số người</label>
              <input
                type="number"
                min={1}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            {/* TOTAL */}
            {tour.price && (
              <p className="text-lg font-semibold text-blue-600">
                Tổng tiền: {(tour.price * people).toLocaleString()} VND
              </p>
            )}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt tour"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
