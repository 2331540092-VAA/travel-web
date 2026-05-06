import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
import { Utensils, Plus, Pencil, Trash2, LayoutGrid } from "lucide-react";
export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    // ✅ search + pagination
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const loadRestaurants = async () => {
        try {
            const data = await RestaurantService.getRestaurants();
            setRestaurants(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadRestaurants();
    }, []);
    const handleDelete = async (id) => {
        if (!confirm("Xóa nhà hàng này?"))
            return;
        try {
            await RestaurantService.deleteRestaurant(id);
            loadRestaurants();
        }
        catch (error) {
            console.error(error);
        }
    };
    // ✅ FILTER
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(search.toLowerCase()));
    // ✅ PAGINATION
    const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i..."] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600", children: _jsx(Utensils, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Nh\u00E0 h\u00E0ng" }), _jsxs("p", { className: "text-xs text-gray-400", children: [restaurants.length, " nh\u00E0 h\u00E0ng"] })] })] }), _jsxs(Link, { to: "/admin/restaurants/create", className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsx("div", { className: "w-72", children: _jsx("input", { type: "text", placeholder: "T\u00ECm nh\u00E0 h\u00E0ng...", value: search, onChange: (e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }, className: "w-full px-3 py-2 border rounded-lg text-sm" }) }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "H\u00ECnh \u1EA3nh" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "T\u00EAn" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Khu v\u1EF1c" }), _jsx("th", { className: "px-5 py-3.5 text-right", children: "Gi\u00E1 TB" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "\u0110\u00E1nh gi\u00E1" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Gi\u1EA3m gi\u00E1" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [currentData.map((r) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: r.id }), _jsx("td", { className: "px-5 py-4", children: r.image_url ? (_jsx("img", { src: r.image_url, alt: r.name, className: "w-20 h-14 object-cover rounded-lg" })) : (_jsx("div", { className: "w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs", children: "No img" })) }), _jsx("td", { className: "px-5 py-4 text-sm font-semibold text-gray-800", children: _jsxs("div", { style: { maxWidth: "180px" }, children: [_jsx("div", { className: "font-semibold text-gray-800 truncate", children: r.name }), r.address && (_jsx("div", { className: "text-xs text-gray-400 truncate mt-0.5", children: r.address }))] }) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: r.location?.name || "—" }), _jsx("td", { className: "px-5 py-4 text-right text-sm font-medium text-gray-700", children: r.min_price && r.max_price ? (_jsxs(_Fragment, { children: [Math.floor(r.min_price).toLocaleString("vi-VN"), " -", " ", Math.floor(r.max_price).toLocaleString("vi-VN"), _jsx("span", { className: "ml-1 text-[10px] text-gray-400 font-normal", children: "VN\u0110" })] })) : (_jsx("span", { className: "text-gray-300", children: "\u2014" })) }), _jsxs("td", { className: "px-5 py-4 text-center text-sm", children: [r.rating ? (_jsxs("span", { className: "font-bold text-yellow-500", children: ["\u2605 ", r.rating] })) : (_jsx("span", { className: "text-gray-300", children: "\u2014" })), r.reviews_count ? (_jsxs("span", { className: "ml-1 text-xs text-gray-400", children: ["(", r.reviews_count, ")"] })) : null] }), _jsx("td", { className: "px-5 py-4 text-center", children: r.discount_percent ? (_jsxs("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold bg-orange-100 text-orange-600", children: ["-", r.discount_percent, "%"] })) : (_jsx("span", { className: "text-gray-300 text-sm", children: "\u2014" })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1.5", children: [_jsx(Link, { to: `/admin/restaurants/${r.id}/tables`, className: "p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors", title: "B\u00E0n", children: _jsx(LayoutGrid, { size: 16 }) }), _jsx(Link, { to: `/admin/restaurants/edit/${r.id}`, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(r.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx(Trash2, { size: 16 }) })] }) })] }, r.id))), restaurants.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Ch\u01B0a c\u00F3 nh\u00E0 h\u00E0ng n\u00E0o." }) }))] })] }) }), _jsxs("div", { className: "flex justify-center gap-2 py-4", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), children: "Prev" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`, children: i + 1 }, i))), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p + 1), children: "Next" })] })] })] }));
}
