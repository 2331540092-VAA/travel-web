import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HotelService from "../../services/HotelService";
import { Hotel as HotelIcon, Plus, Pencil, Trash2, DoorOpen } from "lucide-react";

interface Hotel {
  id: number;
  location_id: number | null;
  name: string;
  rating?: number | null;
  price_per_night: number;
  discount_percent: number | null;
  image_url?: string | null;
  address?: string | null;
  combo_content?: string | null;
  description?: string | null;
  location?: { id: number; name: string } | null;
}

export default function HotelsList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchHotels(); }, []);

  const fetchHotels = async () => {
    try {
      const data = await HotelService.getHotels();
      setHotels(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa khách sạn này?")) return;
    try {
      await HotelService.deleteHotel(id);
      setHotels(hotels.filter((h) => h.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-gray-400">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
      Đang tải...
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            <HotelIcon size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Khách sạn</h1>
            <p className="text-xs text-gray-400">{hotels.length} khách sạn</p>
          </div>
        </div>
        <Link to="/admin/hotels/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline">
          <Plus size={16} /> Thêm mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                <th className="px-5 py-3.5 text-left">ID</th>
                <th className="px-5 py-3.5 text-left">Hình ảnh</th>
                <th className="px-5 py-3.5 text-left">Tên</th>
                <th className="px-5 py-3.5 text-left">Khu vực</th>
                <th className="px-5 py-3.5 text-center">Rating</th>
                <th className="px-5 py-3.5 text-right">Giá/đêm</th>
                <th className="px-5 py-3.5 text-center">Giảm giá</th>
                <th className="px-5 py-3.5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gray-500">{hotel.id}</td>
                  <td className="px-5 py-4">
                    {hotel.image_url ? (
                      <img src={hotel.image_url} alt={hotel.name} className="w-20 h-14 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">{hotel.name}</p>
                    <p className="text-[11px] text-gray-400 truncate max-w-[200px]">{hotel.address || ""}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{hotel.location?.name || "—"}</td>
                  <td className="px-5 py-4 text-center text-sm">
                    {hotel.rating ? (
                      <span className="text-amber-500 font-bold">⭐ {hotel.rating}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                    {hotel.price_per_night?.toLocaleString("vi-VN")} <span className="text-gray-400">VNĐ</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {hotel.discount_percent ? (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-orange-100 text-orange-600">-{hotel.discount_percent}%</span>
                    ) : <span className="text-gray-300 text-sm">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-1.5">
                      <Link to={`/admin/hotels/${hotel.id}/rooms`}
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Phòng">
                        <DoorOpen size={16} />
                      </Link>
                      <Link to={`/admin/hotels/edit/${hotel.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => handleDelete(hotel.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {hotels.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400 text-sm">Chưa có khách sạn nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
