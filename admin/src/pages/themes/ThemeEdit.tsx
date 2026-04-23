import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThemeService from "../../services/ThemeService";

const THEME_TYPES = [
  { value: "tet", label: "🧧 Tết Nguyên Đán" },
  { value: "christmas", label: "🎄 Giáng Sinh (Noel)" },
  { value: "halloween", label: "🎃 Halloween" },
  { value: "valentine", label: "❤️ Valentine" },
  { value: "mid_autumn", label: "🏮 Trung Thu" },
];

const COLOR_PRESETS: Record<string, { primary: string; secondary: string; accent: string }> = {
  tet:        { primary: "#dc2626", secondary: "#f59e0b", accent: "#fbbf24" },
  christmas:  { primary: "#16a34a", secondary: "#dc2626", accent: "#fbbf24" },
  halloween:  { primary: "#ea580c", secondary: "#7c3aed", accent: "#facc15" },
  valentine:  { primary: "#e11d48", secondary: "#ec4899", accent: "#fb7185" },
  mid_autumn: { primary: "#d97706", secondary: "#dc2626", accent: "#fbbf24" },
};

export default function ThemeEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    type: "tet",
    banner_url: "",
    logo_url: "",
    primary_color: "#e74c3c",
    secondary_color: "#f39c12",
    accent_color: "#ffd700",
    description: "",
    start_date: "",
    end_date: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
    ThemeService.getTheme(Number(id))
      .then((data) => {
        setFormData({
          name: data.name || "",
          type: data.type || "tet",
          banner_url: data.banner_url || "",
          logo_url: data.logo_url || "",
          primary_color: data.primary_color || "#e74c3c",
          secondary_color: data.secondary_color || "#f39c12",
          accent_color: data.accent_color || "#ffd700",
          description: data.description || "",
          start_date: data.start_date ? data.start_date.split("T")[0] : "",
          end_date: data.end_date ? data.end_date.split("T")[0] : "",
          is_active: data.is_active || false,
        });
      })
      .catch((err) => console.error("Load theme failed:", err))
      .finally(() => setFetching(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;

    if (target.name === "type" && COLOR_PRESETS[target.value]) {
      const preset = COLOR_PRESETS[target.value];
      setFormData({
        ...formData,
        type: target.value,
        primary_color: preset.primary,
        secondary_color: preset.secondary,
        accent_color: preset.accent,
      });
      return;
    }

    setFormData({ ...formData, [target.name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      banner_url: formData.banner_url || null,
      logo_url: formData.logo_url || null,
      description: formData.description || null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
    };

    try {
      await ThemeService.updateTheme(Number(id), payload);
      alert("Cập nhật theme thành công!");
      navigate("/admin/themes");
    } catch (error) {
      console.error("Update theme failed:", error);
      alert("Cập nhật theme thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (fetching)
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        Đang tải...
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Chỉnh sửa Theme</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Tên theme</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Loại chủ đề</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            {THEME_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Banner URL */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Banner URL</label>
          <input
            type="text"
            name="banner_url"
            value={formData.banner_url}
            onChange={handleChange}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logo_url"
            value={formData.logo_url}
            onChange={handleChange}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Màu chính</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={formData.primary_color}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                className="flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Màu phụ</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={formData.secondary_color}
                onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                className="flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Màu nhấn</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                name="accent_color"
                value={formData.accent_color}
                onChange={handleChange}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={formData.accent_color}
                onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                className="flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1.5 text-sm font-semibold text-gray-700">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Ngày bắt đầu</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Ngày kết thúc</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Active */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="text-sm font-semibold text-gray-700">
            Áp dụng ngay
          </label>
        </div>

        {/* Preview */}
        {formData.banner_url && (
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-gray-700">Xem trước Banner</label>
            <img
              src={formData.banner_url}
              alt="Preview"
              className="w-full h-40 object-cover rounded-xl border border-gray-200"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            {loading ? "Đang lưu..." : "Cập nhật Theme"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/themes")}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
