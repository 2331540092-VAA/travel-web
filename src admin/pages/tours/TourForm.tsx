import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Clock,
  DollarSign,
  Type
} from "lucide-react";
import api from "../../service/api";

export default function TourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: "",
    location_id: 1,
    image_url: "",
    status: "active"
  });

  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locRes = await api.get("/admin/locations");
        setLocations(locRes.data.data || locRes.data);

        if (isEdit) {
          const tourRes = await api.get(`/admin/tours/${id}`);
          const tour = tourRes.data.data || tourRes.data;
          setFormData({
            name: tour.name,
            description: tour.description || "",
            price: tour.price,
            duration: tour.duration || "",
            location_id: tour.location_id,
            image_url: tour.image_url || "",
            status: tour.status || "active"
          });
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/admin/tours/${id}`, formData);
      } else {
        await api.post("/admin/tours", formData);
      }
      navigate("/tours");
    } catch (err) {
      alert("Lỗi khi lưu dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/tours"
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Chỉnh sửa Tour" : "Tạo Tour du lịch mới"}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Quản lý nội dung và giá cả cho chuyến đi.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Type size={18} className="text-blue-500" />
              Nội dung Tour
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Tên chuyến đi</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                placeholder="Ví dụ: Tour Đà Nẵng - Hội An 3N2Đ"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mô tả chi tiết</label>
              <textarea 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[250px]"
                placeholder="Lịch trình tóm tắt, bao gồm những gì..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-emerald-500" />
              Giá & Thời gian
            </h2>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Giá Tour (VNĐ)</label>
              <div className="relative">
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Thời lượng (Ví dụ: 3 Ngày 2 Đêm)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Địa điểm</label>
              <select 
                value={formData.location_id}
                onChange={(e) => setFormData({...formData, location_id: parseInt(e.target.value)})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium cursor-pointer"
              >
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-purple-500" />
              Hình ảnh
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">URL ảnh bìa</label>
              <input 
                type="text" 
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-xs"
                placeholder="https://..."
              />
            </div>

            {formData.image_url && (
              <div className="aspect-video w-full rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isEdit ? "Cấu hình lại Tour" : "Đăng Tour mới"}
          </button>
        </div>
      </form>
    </div>
  );
}
