import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";

interface Restaurant {
  id: number;
  name: string;
}

interface Table {
  id: number;
  restaurant_id: number;
  name: string;
  capacity: number;
  quantity: number;
  note?: string;
}

export default function RestaurantTableCreate() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  const [restaurantId, setRestaurantId] = useState<number | "">("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    restaurant_id: "",
    name: "",
    capacity: "",
    quantity: "1",
    note: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await RestaurantService.getRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error("Load restaurants failed", err);
    } finally {
      setLoading(false);
    }
  };

  const loadTables = async (id: number) => {
    try {
      const data = await RestaurantService.getTablesByRestaurant(id);
      setTables(data);
    } catch (err) {
      console.error("Load tables failed", err);
    }
  };

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);

    setRestaurantId(id);

    setForm({
      ...form,
      restaurant_id: String(id),
    });

    loadTables(id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setForm({
      restaurant_id: String(restaurantId),
      name: "",
      capacity: "",
      quantity: "1",
      note: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!restaurantId) {
      alert("Please select a restaurant");
      return;
    }

    try {
      if (editingId) {
        await RestaurantService.updateTable(editingId, form);
        alert("Table updated");
      } else {
        await RestaurantService.createTable(form);
        alert("Table created");
      }

      resetForm();
      loadTables(Number(restaurantId));
    } catch (err) {
      console.error("Save table failed", err);
      alert("Save failed");
    }
  };

  const handleEdit = (table: Table) => {
    setEditingId(table.id);

    setForm({
      restaurant_id: String(table.restaurant_id),
      name: table.name,
      capacity: String(table.capacity),
      quantity: String(table.quantity),
      note: table.note || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this table?")) return;

    try {
      await RestaurantService.deleteTable(id);
      loadTables(Number(restaurantId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) {
    return <div className="p-6 space-y-6 max-w-5xl mx-auto">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Restaurant Tables</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Restaurant</label>

        <select
          value={restaurantId}
          onChange={handleRestaurantChange}
          className="w-80 bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        >
          <option value="">-- Select Restaurant --</option>

          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {restaurantId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-6 space-y-5"
        >
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Table" : "Add Table"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Table Name (VIP, Couple...)"
              value={form.name}
              onChange={handleChange}
              className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            />

            <input
              name="capacity"
              type="number"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
              className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />

            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />

            <textarea
              name="note"
              placeholder="Note"
              value={form.note}
              onChange={handleChange}
              className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
            >
              {editingId ? "Update Table" : "Create Table"}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/restaurants')}
              className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {tables.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><table className="w-full">
          <thead><tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
              <th className="px-5 py-3.5 text-left border-none">ID</th>
              <th className="px-5 py-3.5 text-left border-none">Name</th>
              <th className="px-5 py-3.5 text-left border-none">Capacity</th>
              <th className="px-5 py-3.5 text-left border-none">Quantity</th>
              <th className="px-5 py-3.5 text-left border-none">Note</th>
              <th className="px-5 py-3.5 text-left border-none">Action</th>
              </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {tables.map((table) => (
              <tr key={table.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 text-sm text-gray-600 border-none">{table.id}</td>
                <td className="px-5 py-4 text-sm text-gray-600 border-none">{table.name}</td>
                <td className="px-5 py-4 text-sm text-gray-600 border-none">{table.capacity}</td>
                <td className="px-5 py-4 text-sm text-gray-600 border-none">{table.quantity}</td>
                <td className="px-5 py-4 text-sm text-gray-600 border-none">{table.note}</td>

                <td className="px-5 py-4 text-sm text-gray-600 border-none flex gap-2">
                  <button
                    onClick={() => handleEdit(table)}
                    className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-100 transition-colors text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(table.id)}
                    className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}
    </div>
  );
}
