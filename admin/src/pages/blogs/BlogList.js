import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogService from "../../services/BlogService";
import { FileText, Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight, } from "lucide-react";
export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    // States cho Tìm kiếm và Phân trang
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số lượng bài viết trên mỗi trang
    useEffect(() => {
        fetchBlogs();
    }, []);
    async function fetchBlogs() {
        try {
            const data = await BlogService.getBlogs();
            setBlogs(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleDelete(id) {
        if (!confirm("Xóa bài viết này?"))
            return;
        try {
            await BlogService.deleteBlog(id);
            setBlogs(blogs.filter((b) => b.id !== id));
        }
        catch (error) {
            console.error(error);
        }
    }
    // 1. Xử lý lọc dữ liệu theo tìm kiếm
    const filteredBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()));
    // 2. Xử lý phân trang
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i..."] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600", children: _jsx(FileText, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD B\u00E0i vi\u1EBFt" }), _jsxs("p", { className: "text-xs text-gray-400", children: [filteredBlogs.length, " b\u00E0i vi\u1EBFt"] })] })] }), _jsxs(Link, { to: "/admin/blogs/create", className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsxs("div", { className: "relative w-72", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: _jsx(Search, { size: 16 }) }), _jsx("input", { type: "text", placeholder: "T\u00ECm ti\u00EAu \u0111\u1EC1 b\u00E0i vi\u1EBFt...", value: search, onChange: (e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                        }, className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "H\u00ECnh \u1EA3nh" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ti\u00EAu \u0111\u1EC1" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ng\u00E0y t\u1EA1o" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [currentData.map((blog) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: blog.id }), _jsx("td", { className: "px-5 py-4", children: blog.cover_url ? (_jsx("img", { src: blog.cover_url, alt: blog.title, className: "w-20 h-14 object-cover rounded-lg" })) : (_jsx("div", { className: "w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs text-center px-1", children: "No image" })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "w-72", children: [_jsx("div", { className: "text-sm font-semibold text-gray-800 truncate", title: blog.title, children: blog.title }), _jsx("div", { className: "text-[11px] text-gray-400 mt-0.5 uppercase tracking-tighter", children: "B\u00E0i vi\u1EBFt Blog" })] }) }), _jsx("td", { className: "px-5 py-4 text-center", children: blog.is_published ? (_jsx("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-emerald-100 text-emerald-600", children: "C\u00F4ng khai" })) : (_jsx("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-gray-100 text-gray-500", children: "B\u1EA3n nh\u00E1p" })) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: blog.created_at
                                                        ? new Date(blog.created_at).toLocaleDateString("vi-VN")
                                                        : "—" }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1.5", children: [_jsx(Link, { to: `/admin/blogs/edit/${blog.id}`, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => blog.id && handleDelete(blog.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx(Trash2, { size: 16 }) })] }) })] }, blog.id))), filteredBlogs.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Kh\u00F4ng t\u00ECm th\u1EA5y b\u00E0i vi\u1EBFt n\u00E0o ph\u00F9 h\u1EE3p." }) }))] })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between px-5 py-4 bg-white border-t border-gray-50", children: [_jsxs("div", { className: "text-xs text-gray-500", children: ["Hi\u1EC3n th\u1ECB ", indexOfFirstItem + 1, " -", " ", Math.min(indexOfLastItem, filteredBlogs.length), " trong t\u1ED5ng s\u1ED1", " ", filteredBlogs.length] }), _jsxs("div", { className: "flex gap-1.5", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), className: `p-2 rounded-lg border transition-all ${currentPage === 1
                                            ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "text-gray-600 border-gray-200 hover:bg-gray-50"}`, children: _jsx(ChevronLeft, { size: 16 }) }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === i + 1
                                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                            : "text-gray-600 hover:bg-gray-50 border border-transparent"}`, children: i + 1 }, i))), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p - 1), className: `p-2 rounded-lg border transition-all ${currentPage === totalPages
                                            ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "text-gray-600 border-gray-200 hover:bg-gray-50"}`, children: _jsx(ChevronRight, { size: 16 }) })] })] }))] })] }));
}
