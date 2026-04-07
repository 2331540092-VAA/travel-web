import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TourService from "../../services/TourService";

interface Location {
  id: number;
  name: string;
}

export default function TourEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [locations, setLocations] = useState<Location[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    location_id: "",
    name: "",
    days: "",
    price: "",
    discount_percent: "",
    combo_content: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    loadLocations();

    if (id) {
      fetchTour();
    }
  }, [id]);

  async function loadLocations() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/locations");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Load locations failed:", err);
    }
  }

  async function fetchTour() {
    try {
      const data = await TourService.getTour(Number(id));

      setFormData({
        location_id: data.location_id?.toString() || "",
        name: data.name || "",
        days: data.days?.toString() || "",
        price: data.price?.toString() || "",
        discount_percent: data.discount_percent?.toString() || "",
        combo_content: data.combo_content || "",
        description: data.description || "",
        image_url: data.image_url || "",
      });
    } catch (error) {
      console.error("Load tour failed:", error);
      alert("Failed to load tour");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    setSaving(true);

    // Xử lý các trường nullable: nếu rỗng thì gửi null
    const payload = {
      ...formData,
      location_id: formData.location_id ? Number(formData.location_id) : null,
      days: formData.days ? Number(formData.days) : null,
      price: formData.price ? Number(formData.price) : null,
      discount_percent: formData.discount_percent ? Number(formData.discount_percent) : null,
      combo_content: formData.combo_content || null,
      description: formData.description || null,
      image_url: formData.image_url || null,
    };

    try {
      await TourService.updateTour(Number(id), payload);
      alert("Tour updated successfully!");
      navigate("/admin/tours");
    } catch (error) {
      console.error("Update tour failed:", error);
      alert("Failed to update tour");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="p-6 space-y-6 max-w-5xl mx-auto">Loading tour...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Tour</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
        {/* Location */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Location</label>

          <select
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="">Select Location</option>

            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tour Name */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Tour Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Days</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount_percent"
            value={formData.discount_percent}
            onChange={handleChange}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Combo */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Combo Content</label>
          <textarea
            name="combo_content"
            value={formData.combo_content}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            {saving ? "Updating..." : "Update Tour"}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/tours')}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
