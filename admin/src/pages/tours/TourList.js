import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourService from "../../services/TourService";
import { Map, Plus, Pencil, Trash2, CalendarDays, Search, ChevronLeft, ChevronRight, LayoutGrid, } from "lucide-react";
export default function TourList() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 10;
    useEffect(() => {
        fetchTours();
    }, []);
    async function fetchTours() {
        try {
            const data = await TourService.getTours();
            setTours(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleDelete(id) {
        if (!confirm("Xóa tour này?"))
            return;
        try {
            await TourService.deleteTour(id);
            setTours((prev) => prev.filter((t) => t.id !== id));
        }
        catch (error) {
            console.error(error);
        }
    }
    const filteredTours = tours.filter((tour) => tour.name.toLowerCase().includes(search.toLowerCase()) ||
        tour.departure_location?.toLowerCase().includes(search.toLowerCase()) ||
        tour.location?.name.toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.ceil(filteredTours.length / toursPerPage);
    const currentTours = filteredTours.slice((currentPage - 1) * toursPerPage, currentPage * toursPerPage);
    if (loading) {
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..."] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("style", { children: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600", children: _jsx(Map, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Tour" }), _jsxs("p", { className: "text-xs text-gray-400", children: [tours.length, " tour trong h\u1EC7 th\u1ED1ng"] })] })] }), _jsxs(Link, { to: "/admin/tours/create", className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsx("div", { className: "w-72", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 16 }), _jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm tour...", value: search, onChange: (e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }, className: "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" })] }) }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto no-scrollbar", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400 border-b border-gray-50", children: [_jsx("th", { className: "px-5 py-3.5 text-center w-12", children: "STT" }), _jsx("th", { className: "px-5 py-3.5", children: "H\u00ECnh \u1EA3nh" }), _jsx("th", { className: "px-5 py-3.5", children: "Th\u00F4ng tin Tour" }), _jsx("th", { className: "px-5 py-3.5", children: "Khu v\u1EF1c" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Th\u1EDDi gian" }), _jsx("th", { className: "px-5 py-3.5", children: "Di chuy\u1EC3n \u0111i" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [currentTours.map((tour, idx) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-center text-sm text-gray-500 font-semibold", children: (currentPage - 1) * toursPerPage + idx + 1 }), _jsx("td", { className: "px-5 py-4", children: tour.image_url ? (_jsx("img", { src: tour.image_url, alt: tour.name, className: "w-16 h-12 object-cover rounded-lg shadow-sm" })) : (_jsx("div", { className: "w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs", children: "No img" })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "text-sm font-semibold text-gray-800 leading-tight", children: tour.name }), tour.departure_location && (_jsxs("div", { className: "text-xs text-gray-400 mt-1", children: ["Kh\u1EDFi h\u00E0nh t\u1EEB: ", tour.departure_location] }))] }) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: tour.location?.name || "—" }), _jsxs("td", { className: "px-5 py-4 text-center text-sm font-medium text-gray-700", children: [tour.days, " ng\u00E0y"] }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500 capitalize", children: tour.transport || "—" }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1.5", children: [_jsx(Link, { to: `/admin/tours/${tour.id}/schedules`, className: "p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors", title: "L\u1ECBch tr\u00ECnh chi ti\u1EBFt", children: _jsx(LayoutGrid, { size: 16 }) }), _jsx(Link, { to: `/admin/tours/${tour.id}/departures`, className: "p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors", title: "Ng\u00E0y kh\u1EDFi h\u00E0nh", children: _jsx(CalendarDays, { size: 16 }) }), _jsx(Link, { to: `/admin/tours/edit/${tour.id}`, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(tour.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx(Trash2, { size: 16 }) })] }) })] }, tour.id))), filteredTours.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Kh\u00F4ng t\u00ECm th\u1EA5y tour n\u00E0o kh\u1EDBp v\u1EDBi t\u00ECm ki\u1EBFm." }) }))] })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-6 border-t border-gray-50 bg-gray-50/30", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), className: "flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-all shadow-sm", children: [_jsx(ChevronLeft, { size: 16 }), " Prev"] }), _jsx("div", { className: "flex items-center gap-1 px-2", children: [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === i + 1
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-gray-500 hover:bg-gray-200"}`, children: i + 1 }, i))) }), _jsxs("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p + 1), className: "flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-all shadow-sm", children: ["Next ", _jsx(ChevronRight, { size: 16 })] })] }), _jsxs("p", { className: "text-[11px] text-gray-400 italic", children: ["Trang ", currentPage, " tr\u00EAn ", totalPages] })] }))] })] }));
}
