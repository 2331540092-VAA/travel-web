import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  MapPin,
  Star,
  Info
} from "lucide-react";
import api from "../../service/api";

export default function HotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    rating: 5,
    image_url: "",
    category_id: 1,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories (usually for a select input)
        const catRes = await api.get("/admin/categories");
        setCategories(catRes.data.data || catRes.data);

        if (isEdit) {
          const hotelRes = await api.get(`/admin/hotels/${id}`);
          const hotel = hotelRes.data.data || hotelRes.data;
          setFormData({
            name: hotel.name,
            address: hotel.address,
            description: hotel.description || "",
            rating: hotel.rating,
            image_url: hotel.image_url || "",
            category_id: hotel.category_id,
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
        await api.put(`/admin/hotels/${id}`, formData);
      } else {
        await api.post("/admin/hotels", formData);
      }
      navigate("/hotels");
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
            to="/hotels"
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Vui lòng điền đầy đủ thông tin bên dưới.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Info size={18} className="text-blue-500" />
              Thông tin cơ bản
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Tên khách sạn</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                placeholder="Ví dụ: Hilton Garden Inn"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Địa chỉ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[100px]"
                  placeholder="Địa chỉ chi tiết..."
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mô tả</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[150px]"
                placeholder="Giới thiệu về khách sạn..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Star size={18} className="text-amber-500" />
              Xếp hạng & Loại
            </h2>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Đánh giá (Sân sao)</label>
              <select 
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} sao</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Danh mục</label>
              <select 
                value={formData.category_id}
                onChange={(e) => setFormData({...formData, category_id: parseInt(e.target.value)})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium cursor-pointer"
              >
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-emerald-500" />
              Hình ảnh
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">URL ảnh đại diện</label>
              <input 
                type="text" 
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
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
            {isEdit ? "Cập nhật thay đổi" : "Lưu khách sạn"}
          </button>
        </div>
      </form>
    </div>
  );
}
