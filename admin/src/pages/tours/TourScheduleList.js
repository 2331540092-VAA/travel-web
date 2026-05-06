import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TourService from "../../services/TourService";
export default function TourScheduleList() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tourName, setTourName] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            fetchSchedules();
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
    async function fetchSchedules() {
        try {
            const data = await TourService.getSchedulesByTour(Number(id));
            const sortedData = data.sort((a, b) => {
                if (a.day_number !== b.day_number)
                    return a.day_number - b.day_number;
                return (a.time || "").localeCompare(b.time || "");
            });
            setSchedules(sortedData);
        }
        catch (error) {
            console.error("Lỗi tải lịch trình:", error);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleDelete(scheduleId) {
        if (!confirm("Bạn có chắc chắn muốn xóa lịch trình này không?"))
            return;
        try {
            await TourService.deleteSchedule(scheduleId);
            setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
        }
        catch (error) {
            console.error("Xóa thất bại:", error);
            alert("Có lỗi xảy ra khi xóa lịch trình.");
        }
    }
    if (loading)
        return (_jsx("div", { className: "p-6 text-center text-gray-500 max-w-5xl mx-auto", children: "\u0110ang t\u1EA3i l\u1ECBch tr\u00ECnh..." }));
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between gap-4 mb-6 md:items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Chi ti\u1EBFt L\u1ECBch tr\u00ECnh" }), _jsx("p", { className: "text-sm text-blue-600 font-medium mt-1", children: tourName })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: `/admin/tours/${id}/schedules/create`, className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 text-sm", children: "+ Th\u00EAm Ho\u1EA1t \u0110\u1ED9ng" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/tours"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm", children: "Quay l\u1EA1i" })] })] }), _jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left w-24", children: "Ng\u00E0y" }), _jsx("th", { className: "px-5 py-3.5 text-left w-32", children: "Th\u1EDDi gian" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ti\u00EAu \u0111\u1EC1 / \u0110\u1ECBa \u0111i\u1EC3m" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ho\u1EA1t \u0111\u1ED9ng chi ti\u1EBFt" }), _jsx("th", { className: "px-5 py-3.5 text-center w-36", children: "Thao t\u00E1c" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [schedules.map((schedule) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsxs("td", { className: "px-5 py-4 text-sm font-bold text-gray-700", children: ["Ng\u00E0y ", schedule.day_number] }), _jsx("td", { className: "px-5 py-4 text-sm text-blue-600 font-medium", children: schedule.time || "--:--" }), _jsx("td", { className: "px-5 py-4 text-sm font-semibold text-gray-800", children: schedule.title }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600 max-w-md", children: _jsx("div", { className: "line-clamp-2", title: schedule.activity, children: schedule.activity }) }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600", children: _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx(Link, { to: `/admin/tours/${id}/schedules/edit/${schedule.id}`, className: "p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }), _jsx("button", { onClick: () => handleDelete(schedule.id), className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })] }) })] }, schedule.id))), schedules.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-10 text-gray-400 text-sm italic", children: "Ch\u01B0a c\u00F3 l\u1ECBch tr\u00ECnh n\u00E0o cho tour n\u00E0y." }) }))] })] }) }) })] }));
}
