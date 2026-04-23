import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeService, { type Theme } from "../../services/ThemeService";
import { Palette, Plus, Pencil, Trash2, Power } from "lucide-react";

const THEME_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  tet: { label: "🧧 Tết Nguyên Đán", color: "bg-red-100 text-red-600" },
  christmas: { label: "🎄 Giáng Sinh", color: "bg-green-100 text-green-600" },
  halloween: { label: "🎃 Halloween", color: "bg-orange-100 text-orange-600" },
  valentine: { label: "❤️ Valentine", color: "bg-pink-100 text-pink-600" },
  mid_autumn: { label: "🏮 Trung Thu", color: "bg-yellow-100 text-yellow-700" },
};

export default function ThemeList() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchThemes();
  }, []);

  async function fetchThemes() {
    try {
      const data = await ThemeService.getThemes();
      setThemes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Xóa theme này?")) return;
    try {
      await ThemeService.deleteTheme(id);
      setThemes(themes.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleActive(id: number) {
    try {
      await ThemeService.toggleActive(id);
      await fetchThemes();
    } catch (error) {
      console.error(error);
    }
  }

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentThemes = themes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(themes.length / itemsPerPage);

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
        Đang tải...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
            <Palette size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Theme</h1>
            <p className="text-xs text-gray-400">{themes.length} chủ đề</p>
          </div>
        </div>
        <Link
          to="/admin/themes/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline"
        >
          <Plus size={16} /> Thêm mới
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                <th className="px-5 py-3.5 text-left">ID</th>
                <th className="px-5 py-3.5 text-left">Banner</th>
                <th className="px-5 py-3.5 text-left">Tên theme</th>
                <th className="px-5 py-3.5 text-left">Loại</th>
                <th className="px-5 py-3.5 text-center">Màu</th>
                <th className="px-5 py-3.5 text-center">Thời gian</th>
                <th className="px-5 py-3.5 text-center">Trạng thái</th>
                <th className="px-5 py-3.5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentThemes.map((theme) => {
                const typeInfo = THEME_TYPE_LABELS[theme.type] || {
                  label: theme.type,
                  color: "bg-gray-100 text-gray-600",
                };
                return (
                  <tr key={theme.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm text-gray-500">{theme.id}</td>
                    <td className="px-5 py-4">
                      {theme.banner_url ? (
                        <img
                          src={theme.banner_url}
                          alt={theme.name}
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-gray-800">{theme.name}</div>
                      {theme.description && (
                        <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
                          {theme.description}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1">
                        {theme.primary_color && (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.primary_color }}
                            title={`Primary: ${theme.primary_color}`}
                          />
                        )}
                        {theme.secondary_color && (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.secondary_color }}
                            title={`Secondary: ${theme.secondary_color}`}
                          />
                        )}
                        {theme.accent_color && (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: theme.accent_color }}
                            title={`Accent: ${theme.accent_color}`}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center text-xs text-gray-500">
                      {theme.start_date && theme.end_date ? (
                        <>
                          {new Date(theme.start_date).toLocaleDateString("vi-VN")} <br /> → {new Date(theme.end_date).toLocaleDateString("vi-VN")}
                        </>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {theme.is_active ? (
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-600">
                          Đang áp dụng
                        </span>
                      ) : (
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-gray-100 text-gray-400">
                          Tắt
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => handleToggleActive(theme.id!)}
                          className={`p-2 rounded-lg transition-colors ${
                            theme.is_active
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                          }`}
                          title={theme.is_active ? "Tắt theme" : "Bật theme"}
                        >
                          <Power size={16} />
                        </button>
                        <Link
                          to={`/admin/themes/edit/${theme.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sửa"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(theme.id!)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {themes.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-gray-400 text-sm">
                    Chưa có theme nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
