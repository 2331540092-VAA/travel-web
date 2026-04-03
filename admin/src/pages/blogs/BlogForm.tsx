import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Edit3
} from "lucide-react";
import api from "../../service/api";

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    content: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEdit) {
          const res = await api.get(`/admin/blogs/${id}`);
          const blog = res.data.data || res.data;
          setFormData({
            title: blog.title,
            short_description: blog.short_description || "",
            content: blog.content || "",
            thumbnail: blog.thumbnail || blog.image_url || "",
          });
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setFetching(false);
      }
    };
    if (isEdit) fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/admin/blogs/${id}`, formData);
      } else {
        await api.post("/admin/blogs", formData);
      }
      navigate("/blogs");
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
            to="/blogs"
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Vui lòng điền nội dung bài viết dưới đây.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <Edit3 size={18} className="text-purple-500" />
              Nội dung chính
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Tiêu đề bài viết</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                placeholder="Nhập tiêu đề..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Mô tả ngắn</label>
              <textarea 
                required
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[80px]"
                placeholder="Tóm tắt nội dung..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Nội dung chi tiết</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium min-h-[300px]"
                placeholder="Nội dung HTML hoặc text..."
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
              <ImageIcon size={18} className="text-emerald-500" />
              Ảnh bìa
            </h2>
            
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">URL ảnh</label>
              <input 
                type="text" 
                value={formData.thumbnail}
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                placeholder="https://..."
              />
            </div>

            {formData.thumbnail && (
              <div className="aspect-video w-full rounded-xl border border-gray-100 overflow-hidden bg-gray-50 mt-4">
                <img src={formData.thumbnail} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {isEdit ? "Cập nhật bài viết" : "Lưu bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
