import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationService from "../../services/LocationService";
import { MapPin, Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
export default function LocationsList() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [countryFilter, setCountryFilter] = useState("");
    const [sortViews, setSortViews] = useState("");
    const ITEMS_PER_PAGE = 10;
    const fetchLocations = async () => {
        try {
            const data = await LocationService.getLocations();
            setLocations(data);
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchLocations();
    }, []);
    const handleDelete = async (id) => {
        if (!confirm("Xóa địa điểm này?"))
            return;
        try {
            await LocationService.deleteLocation(id);
            fetchLocations();
        }
        catch (err) {
            console.error(err);
            alert("Xóa thất bại");
        }
    };
    // 🔍 FILTER
    // Lấy danh sách quốc gia duy nhất
    const countryList = Array.from(new Set(locations.map((loc) => loc.country?.name).filter(Boolean)));
    // Lọc và sắp xếp
    let filteredLocations = locations.filter((loc) => loc.name.toLowerCase().includes(search.toLowerCase()));
    if (countryFilter) {
        filteredLocations = filteredLocations.filter((loc) => loc.country?.name === countryFilter);
    }
    if (sortViews === "asc") {
        filteredLocations = filteredLocations.sort((a, b) => (a.views_count || 0) - (b.views_count || 0));
    }
    else if (sortViews === "desc") {
        filteredLocations = filteredLocations.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    }
    else {
        filteredLocations = filteredLocations.sort((a, b) => a.id - b.id);
    }
    // 📄 PAGINATION
    const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = filteredLocations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600", children: _jsx(MapPin, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD \u0110\u1ECBa \u0111i\u1EC3m" }), _jsxs("p", { className: "text-xs text-gray-400", children: [filteredLocations.length, " \u0111\u1ECBa \u0111i\u1EC3m"] })] })] }), _jsxs("button", { onClick: () => navigate("/admin/locations/create"), className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsxs("div", { className: "relative w-72 mb-2", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 16 }), _jsx("input", { type: "text", placeholder: "T\u00ECm theo t\u00EAn...", value: search, onChange: (e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }, className: "w-full pl-9 pr-3 py-2 border rounded-lg text-sm" })] }), _jsxs("div", { className: "bg-white overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 text-xs uppercase text-gray-400", children: [_jsx("th", { className: "px-5 py-3 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3 text-left", children: "H\u00ECnh \u1EA3nh" }), _jsx("th", { className: "px-5 py-3 text-left", children: "T\u00EAn" }), _jsxs("th", { className: "px-5 py-3 text-left relative group", children: [_jsx("span", { children: "Qu\u1ED1c gia" }), _jsx("button", { className: "ml-1 text-gray-400 hover:text-blue-600 focus:outline-none", title: "L\u1ECDc theo qu\u1ED1c gia", tabIndex: 0, children: _jsx("svg", { width: "14", height: "14", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { stroke: "currentColor", strokeWidth: "2", d: "M4 7h16M7 12h10m-4 5h-2" }) }) }), _jsx("div", { className: "absolute left-0 top-full z-10 bg-white border rounded shadow-md p-2 min-w-30 hidden group-hover:block group-focus-within:block", children: _jsxs("select", { value: countryFilter, onChange: (e) => {
                                                                setCountryFilter(e.target.value);
                                                                setCurrentPage(1);
                                                            }, className: "w-full px-2 py-1 border rounded text-xs text-gray-700", children: [_jsx("option", { value: "", children: "T\u1EA5t c\u1EA3" }), countryList.map((name) => (_jsx("option", { value: name, children: name }, name)))] }) })] }), _jsx("th", { className: "px-5 py-3 text-left", children: "\u0110\u1ECBa ch\u1EC9" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Content" }), _jsxs("th", { className: "px-5 py-3 text-center relative group", children: [_jsx("span", { children: "L\u01B0\u1EE3t xem" }), _jsx("button", { className: "ml-1 text-gray-400 hover:text-blue-600 focus:outline-none", title: "S\u1EAFp x\u1EBFp l\u01B0\u1EE3t xem", tabIndex: 0, children: _jsx("svg", { width: "14", height: "14", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { stroke: "currentColor", strokeWidth: "2", d: "M12 4v16m0 0-4-4m4 4 4-4" }) }) }), _jsxs("div", { className: "absolute right-0 top-full z-10 bg-white border rounded shadow-md p-2 flex flex-col gap-1 min-w-22.5 invisible group-hover:visible group-focus-within:visible", children: [_jsx("button", { className: `px-2 py-1 border rounded text-xs text-left ${sortViews === "desc" ? "bg-blue-600 text-white" : ""}`, onClick: () => setSortViews(sortViews === "desc" ? "" : "desc"), children: "Cao \u0111\u1EBFn th\u1EA5p" }), _jsx("button", { className: `px-2 py-1 border rounded text-xs text-left ${sortViews === "asc" ? "bg-blue-600 text-white" : ""}`, onClick: () => setSortViews(sortViews === "asc" ? "" : "asc"), children: "Th\u1EA5p \u0111\u1EBFn cao" })] })] }), _jsx("th", { className: "px-5 py-3 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { children: [currentData.map((loc) => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { className: "px-5 py-4", children: loc.id }), _jsx("td", { className: "px-5 py-4", children: loc.image_url ? (_jsx("img", { src: loc.image_url, className: "w-20 h-14 object-cover rounded" })) : ("No img") }), _jsx("td", { className: "px-5 py-4 font-semibold", children: loc.name }), _jsx("td", { className: "px-5 py-4", children: loc.country?.name || "—" }), _jsx("td", { className: "px-5 py-4 overflow-hidden text-ellipsis whitespace-nowrap", style: { maxWidth: "150px" }, children: loc.address }), _jsx("td", { className: "px-5 py-4 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500", style: { maxWidth: "200px" }, children: loc.content || "—" }), _jsx("td", { className: "px-5 py-4 text-center", children: loc.views_count || 0 }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx("button", { onClick: () => window.open(`http://localhost:5173/locations/${loc.id}`, "_blank"), className: "p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg", title: "Xem", children: _jsx(Eye, { size: 16 }) }), _jsx("button", { onClick: () => navigate(`/admin/locations/edit/${loc.id}`), className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(loc.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg", children: _jsx(Trash2, { size: 16 }) })] }) })] }, loc.id))), currentData.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "text-center py-10 text-gray-400", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" }) }))] })] }) }), _jsxs("div", { className: "flex justify-center gap-2 py-4", children: [_jsx("button", { disabled: currentPage === 1, onClick: () => setCurrentPage((p) => p - 1), children: "Prev" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`, children: i + 1 }, i))), _jsx("button", { disabled: currentPage === totalPages, onClick: () => setCurrentPage((p) => p + 1), children: "Next" })] })] })] }));
}
