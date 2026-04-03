import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  MapPin,
  Banknote,
  Info
} from "lucide-react";
import api from "../../service/api";

export default function RestaurantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    avg_price: 0,
    discount_percent: 0,
    image_url: "",
    location_id: 1,
    lat: "0",
    lng: "0"
  });

  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locRes = await api.get("/admin/locations");
        setLocations(locRes.data.data || locRes.data);

        if (isEdit) {
          const res = await api.get(`/admin/restaurants/${id}`);
          const restaurant = res.data.data || res.data;
          setFormData({
            name: restaurant.name,
            address: restaurant.address || "",
            description: restaurant.description || "",
            avg_price: restaurant.avg_price || 0,
            discount_percent: restaurant.discount_percent || 0,
            image_url: restaurant.image_url || "",
            location_id: restaurant.location_id || 1,
            lat: restaurant.lat || "0",
            lng: restaurant.lng || "0"
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
        await api.put(`/admin/restaurants/${id}`, formData);
      } else {
        await api.post("/admin/restaurants", formData);
      }
      navigate("/restaurants");
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
            to="/restaurants"
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Chỉnh sửa nhà hàng" : "Thêm nhà hàng mới"}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Vui lòng điền đầy đủ thông tin bên dưới.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Info size={18} className="text-orange-500" />
              Thông tin cơ bản
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Tên nhà hàng</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                placeholder="Ví dụ: Golden Lotus Restaurant"
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
                placeholder="Giới thiệu về nhà hàng..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Vĩ độ (Lat)</label>
                <input 
                  type="text" 
                  value={formData.lat}
                  onChange={(e) => setFormData({...formData, lat: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
               </div>
               <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Kinh độ (Lng)</label>
                <input 
                  type="text" 
                  value={formData.lng}
                  onChange={(e) => setFormData({...formData, lng: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Banknote size={18} className="text-amber-500" />
              Thông tin bổ sung
            </h2>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mức giá trung bình</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={formData.avg_price}
                  onChange={(e) => setFormData({...formData, avg_price: Number(e.target.value)})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <span className="absolute right-4 top-2.5 text-gray-500">VNĐ</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Phần trăm giảm giá (%)</label>
              <input 
                type="number" 
                max="100"
                min="0"
                value={formData.discount_percent}
                onChange={(e) => setFormData({...formData, discount_percent: Number(e.target.value)})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Địa điểm / Khu vực</label>
              <select 
                value={formData.location_id}
                onChange={(e) => setFormData({...formData, location_id: parseInt(e.target.value)})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium cursor-pointer"
              >
                {locations.length > 0 ? (
                  locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)
                ) : (
                  <option value="">Không có dữ liệu</option>
                )}
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
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isEdit ? "Cập nhật thay đổi" : "Lưu nhà hàng"}
          </button>
        </div>
      </form>
    </div>
  );
}
