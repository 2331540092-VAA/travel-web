import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HotelService from "../../services/HotelService";
import { Hotel as HotelIcon, Plus, Pencil, Trash2, DoorOpen, } from "lucide-react";
export default function HotelsList() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    // ✅ search + pagination
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    useEffect(() => {
        fetchHotels();
    }, []);
    const fetchHotels = async () => {
        try {
            const data = await HotelService.getHotels();
            setHotels(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Xóa khách sạn này?"))
            return;
        try {
            await HotelService.deleteHotel(id);
            setHotels(hotels.filter((h) => h.id !== id));
        }
        catch (error) {
            console.error(error);
        }
    };
    // ✅ FILTER
    const filteredHotels = hotels.filter((hotel) => hotel.name.toLowerCase().includes(search.toLowerCase()));
    // ✅ PAGINATION
    const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = filteredHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i..."] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600", children: _jsx(HotelIcon, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Kh\u00E1ch s\u1EA1n" }), _jsxs("p", { className: "text-xs text-gray-400", children: [filteredHotels.length, " kh\u00E1ch s\u1EA1n"] })] })] }), _jsxs(Link, { to: "/admin/hotels/create", className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 text-sm font-medium", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsx("div", { className: "w-72", children: _jsx("input", { type: "text", placeholder: "T\u00ECm kh\u00E1ch s\u1EA1n...", value: search, onChange: (e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }, className: "w-full px-3 py-2 border rounded-lg text-sm" }) }), _jsxs("div", { className: "bg-white overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full table-fixed", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 text-xs uppercase text-gray-400", children: [_jsx("th", { className: "px-5 py-3 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3 text-left", children: "H\u00ECnh \u1EA3nh" }), _jsx("th", { className: "px-5 py-3 text-left", children: "T\u00EAn" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Khu v\u1EF1c" }), _jsx("th", { className: "px-5 py-3 text-center", children: "Rating" }), _jsx("th", { className: "px-5 py-3 text-right", children: "Gi\u00E1/\u0111\u00EAm" }), _jsx("th", { className: "px-5 py-3 text-center", children: "Gi\u1EA3m gi\u00E1" }), _jsx("th", { className: "px-5 py-3 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { children: [currentData.map((hotel) => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: hotel.id }), _jsx("td", { className: "px-5 py-4", children: hotel.image_url ? (_jsx("img", { src: hotel.image_url, className: "w-20 h-14 object-cover rounded" })) : ("No img") }), _jsxs("td", { className: "px-5 py-4", children: [_jsx("p", { className: "text-sm font-semibold", children: hotel.name }), _jsx("p", { className: "text-xs text-gray-400 truncate max-w-50", children: hotel.address && hotel.address.trim() !== ""
                                                                ? hotel.address
                                                                : "—" })] }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: hotel.location?.name || "—" }), _jsx("td", { className: "px-5 py-4 text-center", children: hotel.rating ? (_jsxs("span", { className: "text-amber-500 font-bold", children: ["\u2B50 ", hotel.rating] })) : ("—") }), _jsxs("td", { className: "px-5 py-4 text-right font-medium", children: [new Intl.NumberFormat("vi-VN").format(hotel.price_per_night || 0), " ", "VN\u0110"] }), _jsx("td", { className: "px-5 py-4 text-center", children: hotel.discount_percent ? (_jsxs("span", { className: "text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full", children: ["-", hotel.discount_percent, "%"] })) : ("—") }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx(Link, { to: `/admin/hotels/${hotel.id}/rooms`, className: "p-2 hover:text-emerald-600", children: _jsx(DoorOpen, { size: 16 }) }), _jsx(Link, { to: `/admin/hotels/edit/${hotel.id}`, className: "p-2 hover:text-blue-600", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(hotel.id), className: "p-2 hover:text-red-600", children: _jsx(Trash2, { size: 16 }) })] }) })] }, hotel.id))), currentData.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-10 text-gray-400", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" }) }))] })] }) }), _jsxs("div", { className: "flex justify-center gap-2 py-4", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), children: "Prev" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`, children: i + 1 }, i))), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p + 1), children: "Next" })] })] })] }));
}
