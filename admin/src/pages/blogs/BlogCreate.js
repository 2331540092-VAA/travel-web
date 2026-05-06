import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { Save, X, Image as ImageIcon, FileText } from "lucide-react";
export default function BlogCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        cover_url: "",
        is_published: true,
    });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFormData({
                ...formData,
                [name]: e.target.checked,
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await BlogService.createBlog(formData);
            alert("Đã thêm bài viết mới thành công!");
            navigate("/admin/blogs");
        }
        catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
            alert("Tạo bài viết thất bại, vui lòng thử lại.");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "p-6 max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600", children: _jsx(FileText, { size: 22 }) }), _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm b\u00E0i vi\u1EBFt m\u1EDBi" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Ti\u00EAu \u0111\u1EC1 b\u00E0i vi\u1EBFt" }), _jsx("input", { type: "text", name: "title", placeholder: "Nh\u1EADp ti\u00EAu \u0111\u1EC1 h\u1EA5p d\u1EABn...", value: formData.title, onChange: handleChange, required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2 mb-1.5 text-sm font-semibold text-gray-700 w-full", children: [_jsx(ImageIcon, { size: 16 }), " URL \u1EA2nh b\u00ECa"] }), _jsx("input", { type: "text", name: "cover_url", placeholder: "https://example.com/image.jpg", value: formData.cover_url, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "N\u1ED9i dung b\u00E0i vi\u1EBFt" }), _jsx("textarea", { name: "content", value: formData.content, onChange: handleChange, rows: 10, placeholder: "Vi\u1EBFt n\u1ED9i dung b\u00E0i vi\u1EBFt t\u1EA1i \u0111\u00E2y...", required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100", children: [_jsx("input", { type: "checkbox", name: "is_published", id: "is_published", checked: formData.is_published, onChange: handleChange, className: "w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" }), _jsx("label", { htmlFor: "is_published", className: "text-sm font-medium text-gray-700 cursor-pointer", children: "C\u00F4ng khai b\u00E0i vi\u1EBFt n\u00E0y (Ng\u01B0\u1EDDi d\u00F9ng c\u00F3 th\u1EC3 xem ngay)" })] }), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-gray-50", children: [_jsxs("button", { type: "submit", disabled: loading, className: "flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 disabled:bg-blue-300", children: [_jsx(Save, { size: 18 }), loading ? "Đang lưu..." : "Lưu bài viết"] }), _jsxs("button", { type: "button", onClick: () => navigate("/admin/blogs"), className: "flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors", children: [_jsx(X, { size: 18 }), "H\u1EE7y b\u1ECF"] })] })] })] }));
}
