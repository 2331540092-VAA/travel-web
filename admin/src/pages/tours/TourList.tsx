import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourService from "../../services/TourService";
import { Map, Plus, Pencil, Trash2, CalendarDays } from "lucide-react";

interface Tour {
  id: number;
  location_id: number;
  name: string;
  days: number;
  price: number;
  discount_percent: number;
  image_url?: string;
  location?: { id: number; name: string };
}

export default function TourList() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;

  useEffect(() => { fetchTours(); }, []);

  async function fetchTours() {
    try {
      const data = await TourService.getTours();
      setTours(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Xóa tour này?")) return;
    try {
      await TourService.deleteTour(id);
      setTours(tours.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const indexOfLast = currentPage * toursPerPage;
  const indexOfFirst = indexOfLast - toursPerPage;
  const currentTours = tours.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tours.length / toursPerPage);

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
          <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
            <Map size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Tour</h1>
            <p className="text-xs text-gray-400">{tours.length} tour du lịch</p>
          </div>
        </div>
        <Link to="/admin/tours/create"
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
                <th className="px-5 py-3.5 text-left">Tên tour</th>
                <th className="px-5 py-3.5 text-left">Khu vực</th>
                <th className="px-5 py-3.5 text-center">Số ngày</th>
                <th className="px-5 py-3.5 text-right">Giá</th>
                <th className="px-5 py-3.5 text-center">Giảm giá</th>
                <th className="px-5 py-3.5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gray-500">{tour.id}</td>
                  <td className="px-5 py-4">
                    {tour.image_url ? (
                      <img src={tour.image_url} alt={tour.name} className="w-20 h-14 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-800">{tour.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{tour.location?.name || "—"}</td>
                  <td className="px-5 py-4 text-center text-sm font-medium text-gray-700">{tour.days} ngày</td>
                  <td className="px-5 py-4 text-right text-sm font-medium text-gray-700">
                    {tour.price ? `${Number(tour.price).toLocaleString("vi-VN")} VNĐ` : "—"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {tour.discount_percent ? (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-orange-100 text-orange-600">-{tour.discount_percent}%</span>
                    ) : <span className="text-gray-300 text-sm">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-1.5">
                      <Link to={`/admin/tours/${tour.id}/schedules`}
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Lịch trình">
                        <CalendarDays size={16} />
                      </Link>
                      <Link to={`/admin/tours/edit/${tour.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => handleDelete(tour.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {tours.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400 text-sm">Chưa có tour nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                currentPage === i + 1 ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
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
