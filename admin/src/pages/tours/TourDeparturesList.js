import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TourService from "../../services/TourService";
import { Tag } from "lucide-react"; // Thêm icon Tag cho đẹp
export default function TourDepartureList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tourName, setTourName] = useState("");
    const [departures, setDepartures] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            fetchDepartures();
            fetchTour();
        }
    }, [id]);
    async function fetchTour() {
        try {
            const tour = await TourService.getTour(Number(id));
            setTourName(tour.name);
        }
        catch (error) {
            console.error("Lỗi tải thông tin tour:", error);
        }
    }
    async function fetchDepartures() {
        try {
            const data = await TourService.getDeparturesByTour(Number(id));
            const sortedData = data.sort((a, b) => new Date(a.departure_date).getTime() -
                new Date(b.departure_date).getTime());
            setDepartures(sortedData);
        }
        catch (error) {
            console.error("Lỗi tải danh sách khởi hành:", error);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleDelete(depId) {
        if (!confirm("Bạn có chắc chắn muốn xóa ngày khởi hành này không?"))
            return;
        try {
            await TourService.deleteDeparture(depId);
            setDepartures((prev) => prev.filter((d) => d.id !== depId));
        }
        catch (error) {
            console.error("Xóa thất bại:", error);
            alert("Có lỗi xảy ra khi xóa dữ liệu.");
        }
    }
    const renderStatus = (status) => {
        const s = status?.toString().toLowerCase().trim();
        switch (s) {
            case "available":
                return (_jsx("span", { className: "px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-green-100 text-green-600", children: "C\u00F2n ch\u1ED7" }));
            case "full":
                return (_jsx("span", { className: "px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-orange-100 text-orange-600", children: "H\u1EBFt ch\u1ED7" }));
            case "cancelled":
                return (_jsx("span", { className: "px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-red-100 text-red-600", children: "\u0110\u00E3 h\u1EE7y" }));
            default:
                return (_jsx("span", { className: "px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-gray-100 text-gray-600", children: status }));
        }
    };
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400 max-w-5xl mx-auto", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i th\u00F4ng tin kh\u1EDFi h\u00E0nh..."] }));
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between gap-4 mb-6 md:items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Ng\u00E0y kh\u1EDFi h\u00E0nh" }), _jsx("p", { className: "text-sm text-blue-600 font-medium mt-1", children: tourName })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: `/admin/tours/${id}/departures/create`, className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm no-underline", children: "+ Th\u00EAm Ng\u00E0y Kh\u1EDFi H\u00E0nh" }), _jsx("button", { onClick: () => navigate("/admin/tours"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 text-sm transition-colors", children: "Quay l\u1EA1i" })] })] }), _jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400 border-b border-gray-50", children: [_jsx("th", { className: "px-4 py-3.5 text-center w-12", children: "STT" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ng\u00E0y kh\u1EDFi h\u00E0nh" }), _jsx("th", { className: "px-5 py-3.5 text-right", children: "Gi\u00E1 & Khuy\u1EBFn m\u00E3i" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "S\u1ED1 ch\u1ED7 (\u0110\u00E3 \u0111\u1EB7t/T\u1ED5ng)" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-5 py-3.5 text-center w-36", children: "Thao t\u00E1c" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: departures.map((d, idx) => {
                                    // Tính giá sau khi giảm
                                    const finalPrice = d.price * (1 - (d.discount_percent || 0) / 100);
                                    return (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-4 py-4 text-center text-sm text-gray-500 font-semibold", children: idx + 1 }), _jsx("td", { className: "px-5 py-4 text-sm font-bold text-gray-700", children: new Date(d.departure_date).toLocaleDateString("vi-VN") }), _jsx("td", { className: "px-5 py-4 text-right", children: _jsxs("div", { className: "flex flex-col items-end", children: [d.discount_percent > 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold", children: ["-", d.discount_percent, "%"] }), _jsx("span", { className: "text-xs text-gray-400 line-through", children: Number(d.price).toLocaleString("vi-VN") })] }), _jsxs("span", { className: "text-sm font-bold text-red-600", children: [finalPrice.toLocaleString("vi-VN"), " \u0111"] })] })) : (_jsxs("span", { className: "text-sm font-semibold text-blue-600", children: [Number(d.price).toLocaleString("vi-VN"), " \u0111"] })), d.is_promotion && (_jsxs("span", { className: "text-[9px] text-amber-600 font-medium flex items-center gap-1 mt-1", children: [_jsx(Tag, { size: 10 }), " \u0110ang ch\u1EA1y \u01B0u \u0111\u00E3i"] }))] }) }), _jsxs("td", { className: "px-5 py-4 text-center text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx("span", { className: `font-bold ${d.booked >= d.capacity ? "text-red-500" : "text-gray-800"}`, children: d.booked }), _jsx("span", { className: "text-gray-400", children: "/" }), _jsx("span", { children: d.capacity })] }), _jsx("div", { className: "w-20 h-1 bg-gray-100 rounded-full mt-1.5 mx-auto overflow-hidden", children: _jsx("div", { className: `h-full transition-all ${d.booked >= d.capacity ? "bg-red-500" : "bg-blue-500"}`, style: {
                                                                width: `${Math.min((d.booked / d.capacity) * 100, 100)}%`,
                                                            } }) })] }), _jsx("td", { className: "px-5 py-4 text-center", children: renderStatus(d.status) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600 text-center", children: _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx(Link, { to: `/admin/tours/${id}/departures/edit/${d.id}`, className: "p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }), _jsx("button", { onClick: () => handleDelete(d.id), className: "p-1.5 text-red-600 hover:bg-red-50 rounded-lg", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] }) })] }, d.id));
                                }) })] }) }) })] }));
}
