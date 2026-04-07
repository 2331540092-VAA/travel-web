import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationService from "../../services/LocationService";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export default function LocationsList() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<any[]>([]);

  const fetchLocations = async () => {
    try {
      const data = await LocationService.getLocations();
      setLocations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa địa điểm này?")) return;
    try {
      await LocationService.deleteLocation(id);
      fetchLocations();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <MapPin size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Địa điểm</h1>
            <p className="text-xs text-gray-400">{locations.length} địa điểm</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin/locations/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
        >
          <Plus size={16} /> Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                <th className="px-5 py-3.5 text-left">ID</th>
                <th className="px-5 py-3.5 text-left">Hình ảnh</th>
                <th className="px-5 py-3.5 text-left">Tên</th>
                <th className="px-5 py-3.5 text-left">Loại</th>
                <th className="px-5 py-3.5 text-left">Quốc gia</th>
                <th className="px-5 py-3.5 text-left">Địa chỉ</th>
                <th className="px-5 py-3.5 text-left">Mô tả</th>
                <th className="px-5 py-3.5 text-center">Lượt xem</th>
                <th className="px-5 py-3.5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gray-500">{loc.id}</td>
                  <td className="px-5 py-4">
                    {loc.image_url ? (
                      <img src={loc.image_url} alt={loc.name} className="w-20 h-14 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">{loc.name}</td>
                  <td className="px-5 py-4">
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-blue-100 text-blue-600">
                      {loc.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{loc.country?.name || "—"}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 max-w-[180px] truncate">{loc.address || "—"}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 max-w-[200px] truncate">{loc.description || "—"}</td>
                  <td className="px-5 py-4 text-center text-sm text-gray-500">{loc.views_count || 0}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => navigate(`/admin/locations/edit/${loc.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(loc.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-12 text-center text-gray-400 text-sm">Chưa có địa điểm nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
