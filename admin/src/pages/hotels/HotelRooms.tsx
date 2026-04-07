import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";

interface Room {
  id: number;
  name: string;
  price_per_night: number;
  capacity: number;
  quantity: number;
  description?: string;
}

export default function HotelRooms() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    price_per_night: "",
    capacity: "2",
    quantity: "1",
    description: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      if (!hotelId) return;

      const data = await HotelService.getRoomsByHotel(Number(hotelId));
      setRooms(data);
    } catch (err) {
      console.error(err);
      alert("Cannot load rooms");
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

  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      price_per_night: "",
      capacity: "2",
      quantity: "1",
      description: "",
    });
    setEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
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
      };

      if (editing) {
        await HotelService.updateRoom(form.id, payload);
        alert("Room updated");
      } else {
        await HotelService.createRoom(payload);
        alert("Room created");
      }

      resetForm();
      loadRooms();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleEdit = (room: Room) => {
    setEditing(true);

    setForm({
      id: room.id,
      name: room.name,
      price_per_night: String(room.price_per_night),
      capacity: String(room.capacity),
      quantity: String(room.quantity),
      description: room.description || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this room?")) return;

    try {
      await HotelService.deleteRoom(id);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Hotel Rooms</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-6 space-y-5"
      >
        <h2 className="font-semibold">
          {editing ? "Edit Room" : "Create Room"}
        </h2>

        <input
          name="name"
          placeholder="Room name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          required
        />

        <input
          name="price_per_night"
          placeholder="Price per night"
          value={form.price_per_night}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          required
        />

        <input
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            {editing ? "Update" : "Create"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/hotels')}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><table className="w-full">
        <thead><tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
            <th className="px-5 py-3.5 text-left border-none">ID</th>
            <th className="px-5 py-3.5 text-left border-none">Room</th>
            <th className="px-5 py-3.5 text-left border-none">Price</th>
            <th className="px-5 py-3.5 text-left border-none">Capacity</th>
            <th className="px-5 py-3.5 text-left border-none">Quantity</th>
            <th className="px-5 py-3.5 text-left border-none">Description</th>
            <th className="px-5 py-3.5 text-left border-none">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-5 py-4 text-sm text-gray-600 border-none">{room.id}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{room.name}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">${room.price_per_night}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{room.capacity}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{room.quantity}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{room.description}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-100 transition-colors text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(room.id)}
                  className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {rooms.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No rooms found
              </td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
}
