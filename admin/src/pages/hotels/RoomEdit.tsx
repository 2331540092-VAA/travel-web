import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";

export default function RoomEdit() {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price_per_night: "",
    capacity: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/admin/hotel-rooms/${roomId}`,
      );

      const data = await res.json();

      setForm({
        name: data.name ?? "",
        price_per_night: data.price_per_night ?? "",
        capacity: data.capacity ?? "",
        quantity: data.quantity ?? "",
        description: data.description ?? "",
      });
    } catch (err) {
      console.error(err);
      alert("Cannot load room");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await HotelService.updateRoom(Number(roomId), {
        hotel_id: Number(hotelId),
        name: form.name,
        price_per_night: Number(form.price_per_night),
        capacity:
          form.capacity !== undefined && form.capacity !== ""
            ? Number(form.capacity)
            : null,
        quantity:
          form.quantity !== undefined && form.quantity !== ""
            ? Number(form.quantity)
            : null,
        description: form.description || null,
      });

      alert("Room updated successfully");

      navigate(`/admin/hotels/${hotelId}/rooms`);
    } catch (err) {
      console.error(err);
      alert("Update room failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Room</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
        {/* NAME */}
        <input
          name="name"
          placeholder="Room name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          required
        />

        {/* PRICE */}
        <input
          name="price_per_night"
          placeholder="Price per night"
          value={form.price_per_night}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          required
        />

        {/* CAPACITY */}
        <input
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        {/* QUANTITY */}
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-amber-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin/hotels/${hotelId}/rooms`)}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
