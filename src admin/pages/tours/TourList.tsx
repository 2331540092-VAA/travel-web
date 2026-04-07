import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MapPin,
  Calendar,
  Loader2,
  Clock,
  DollarSign
} from "lucide-react";
import api from "../../service/api";
import { Link } from "react-router-dom";

export default function TourList() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTours = async () => {
    try {
      const response = await api.get("/admin/tours");
      setTours(response.data.data || response.data);
    } catch (err) {
      console.error("Failed to fetch tours", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tour này?")) return;
    try {
      await api.delete(`/admin/tours/${id}`);
      setTours(tours.filter(t => t.id !== id));
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.location?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Tours</h1>
          <p className="text-gray-500 mt-1">Danh sách tất cả các chuyến du lịch và lịch trình.</p>
        </div>
        <Link 
          to="/tours/create"
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95 w-fit"
        >
          <Plus size={20} />
          Thêm Tour mới
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm tên tour, địa điểm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.length > 0 ? filteredTours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <div className="aspect-video w-full bg-gray-100 relative">
              {tour.image_url ? (
                <img src={tour.image_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <MapPin size={40} />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <Link 
                  to={`/tours/${tour.id}/edit`}
                  className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm hover:bg-white transition-colors"
                >
                  <Edit2 size={16} />
                </Link>
                <button 
                  onClick={() => handleDelete(tour.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm hover:bg-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <DollarSign size={12} />
                {new Intl.NumberFormat('vi-VN').format(tour.price)} VNĐ
              </div>
            </div>
            
            <div className="p-5 space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 line-clamp-1">{tour.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin size={12} />
                  <span>{tour.location?.name || "Chưa xác định"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={14} className="text-blue-500" />
                  <span className="text-xs font-medium">{tour.duration || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} className="text-emerald-500" />
                  <span className="text-xs font-medium">{tour.schedules_count || 0} lịch trình</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link 
                  to={`/tours/${tour.id}/schedules`}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Quản lý lịch trình
                  <Plus size={12} />
                </Link>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  tour.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tour.status || 'Active'}
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center text-gray-500 italic">
            Không tìm thấy tour nào.
          </div>
        )}
      </div>
    </div>
  );
}
