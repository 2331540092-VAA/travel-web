import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { deleteBooking, getBookings, } from "../../services/BookingService";
import { Link } from "react-router-dom";
import { ClipboardList, ExternalLink, Search, ChevronLeft, ChevronRight, Trash2, } from "lucide-react";
const BookingList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    // States cho Tìm kiếm và Phân trang
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Số lượng dòng trên mỗi trang
    useEffect(() => {
        setLoading(true);
        getBookings()
            .then((res) => setData(res))
            .finally(() => setLoading(false));
    }, []);
    const handleDelete = async (bookingId) => {
        if (!window.confirm(`Bạn có chắc muốn xóa booking #${bookingId}?`)) {
            return;
        }
        setDeletingId(bookingId);
        try {
            await deleteBooking(bookingId);
            setData((prev) => prev.filter((item) => item.id !== bookingId));
        }
        catch (error) {
            alert("Xóa booking thất bại, vui lòng thử lại.");
        }
        finally {
            setDeletingId(null);
        }
    };
    // 1. Xử lý lọc dữ liệu (Tìm theo User ID hoặc Loại đặt hoặc Trạng thái)
    const filteredData = data.filter((item) => item.user_id?.toString().includes(search.toLowerCase()) ||
        item.booking_type?.toLowerCase().includes(search.toLowerCase()) ||
        item.status?.toLowerCase().includes(search.toLowerCase()));
    // 2. Xử lý phân trang
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u \u0111\u1EB7t ch\u1ED7..."] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600", children: _jsx(ClipboardList, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD \u0110\u1EB7t ch\u1ED7" }), _jsxs("p", { className: "text-xs text-gray-400", children: [filteredData.length, " \u0111\u01A1n \u0111\u1EB7t"] })] })] }) }), _jsxs("div", { className: "relative w-72", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: _jsx(Search, { size: 16 }) }), _jsx("input", { type: "text", placeholder: "T\u00ECm theo User ID, lo\u1EA1i, tr\u1EA1ng th\u00E1i...", value: search, onChange: (e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }, className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400 border-b border-gray-50", children: [_jsx("th", { className: "px-5 py-3.5", children: "ID" }), _jsx("th", { className: "px-5 py-3.5", children: "User ID" }), _jsx("th", { className: "px-5 py-3.5", children: "Lo\u1EA1i \u0111\u1EB7t" }), _jsx("th", { className: "px-5 py-3.5", children: "M\u00E3 \u0111\u1ED1i t\u01B0\u1EE3ng" }), _jsx("th", { className: "px-5 py-3.5", children: "Th\u1EDDi gian" }), _jsx("th", { className: "px-5 py-3.5", children: "SL" }), _jsx("th", { className: "px-5 py-3.5 text-right", children: "T\u1ED5ng ti\u1EC1n" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Thao t\u00E1c" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [currentData.map((row) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500 font-medium", children: row.id }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600", children: row.user_id }), _jsx("td", { className: "px-5 py-4", children: _jsx("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-purple-100 text-purple-600", children: row.booking_type }) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: row.target_id }), _jsxs("td", { className: "px-5 py-4", children: [_jsxs("div", { className: "text-xs text-gray-600", children: [_jsx("span", { className: "font-semibold", children: "In:" }), " ", row.check_in
                                                                    ? new Date(row.check_in).toLocaleDateString("vi-VN")
                                                                    : "—"] }), _jsxs("div", { className: "text-xs text-gray-400 mt-0.5", children: [_jsx("span", { className: "font-semibold", children: "Out:" }), " ", row.check_out
                                                                    ? new Date(row.check_out).toLocaleDateString("vi-VN")
                                                                    : "—"] })] }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600", children: row.quantity }), _jsx("td", { className: "px-5 py-4 text-right", children: _jsxs("span", { className: "text-sm font-bold text-gray-800", children: [Number(row.total_amount || 0).toLocaleString("vi-VN"), _jsx("span", { className: "ml-1 text-[10px] text-gray-400 font-normal text-right", children: "VN\u0110" })] }) }), _jsx("td", { className: "px-5 py-4 text-center", children: _jsx("span", { className: `text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${row.status === "paid"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : row.status === "confirmed"
                                                                ? "bg-emerald-100 text-emerald-600"
                                                                : row.status === "completed"
                                                                    ? "bg-cyan-100 text-cyan-600"
                                                                    : row.status === "cancelled"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : "bg-amber-100 text-amber-600"}`, children: row.status }) }), _jsx("td", { className: "px-5 py-4 text-center", children: _jsxs("div", { className: "inline-flex items-center gap-2", children: [_jsx(Link, { to: `/admin/bookings/${row.id}`, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex", title: "Xem chi ti\u1EBFt", children: _jsx(ExternalLink, { size: 16 }) }), _jsx("button", { type: "button", onClick: () => handleDelete(row.id), disabled: deletingId === row.id, className: `p-2 rounded-lg transition-colors inline-flex ${deletingId === row.id
                                                                    ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                                                                    : "text-red-400 hover:text-red-600 hover:bg-red-50"}`, title: "X\u00F3a booking", children: _jsx(Trash2, { size: 16 }) })] }) })] }, row.id))), filteredData.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 9, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Kh\u00F4ng t\u00ECm th\u1EA5y \u0111\u01A1n \u0111\u1EB7t ch\u1ED7 n\u00E0o." }) }))] })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between px-5 py-4 bg-white border-t border-gray-50", children: [_jsxs("div", { className: "text-xs text-gray-500", children: ["Hi\u1EC3n th\u1ECB ", indexOfFirstItem + 1, " -", " ", Math.min(indexOfLastItem, filteredData.length), " trong t\u1ED5ng s\u1ED1", " ", filteredData.length] }), _jsxs("div", { className: "flex gap-1.5", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), className: `p-2 rounded-lg border transition-all ${currentPage === 1
                                            ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "text-gray-600 border-gray-200 hover:bg-gray-50"}`, children: _jsx(ChevronLeft, { size: 16 }) }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === i + 1
                                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                            : "text-gray-600 hover:bg-gray-50 border border-transparent"}`, children: i + 1 }, i))), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p + 1), className: `p-2 rounded-lg border transition-all ${currentPage === totalPages
                                            ? "text-gray-300 border-gray-100 cursor-not-allowed"
                                            : "text-gray-600 border-gray-200 hover:bg-gray-50"}`, children: _jsx(ChevronRight, { size: 16 }) })] })] }))] })] }));
};
export default BookingList;
