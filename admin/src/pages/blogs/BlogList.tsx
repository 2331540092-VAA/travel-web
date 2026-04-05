import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  FileText as BlogIcon,
  User,
  Calendar,
  Loader2
} from "lucide-react";
import api from "../../service/api";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/admin/blogs");
      setBlogs(response.data.data || response.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      alert("Xóa thất bại!");
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Bài viết</h1>
          <p className="text-gray-500 mt-1">Danh sách tất cả bài viết, blog tin tức.</p>
        </div>
        <Link 
          to="/blogs/create"
          className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 w-fit"
        >
          <Plus size={20} />
          Thêm bài viết
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm tiêu đề, nội dung..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bài viết</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tác giả</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 overflow-hidden border border-purple-100">
                        {blog.image_url || blog.thumbnail ? (
                          <img src={blog.image_url || blog.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <BlogIcon size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1 max-w-[300px]">{blog.title || "Chưa có tiêu đề"}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[300px]">{blog.short_description || "..."}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                      <User size={14} />
                      <span className="truncate max-w-[150px]">{blog.author?.name || "Admin"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                      <Calendar size={14} />
                      <span>{new Date(blog.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/blogs/${blog.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                         onClick={() => handleDelete(blog.id)}
                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                         title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                    Không có bài viết nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
