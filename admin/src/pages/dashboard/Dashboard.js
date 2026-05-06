import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Users, MapPin, Hotel, Map, ArrowUpRight, Loader2, BarChart3, Utensils, TrendingUp, } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardService from "../../services/DashboardService";
import ReportService from "../../services/ReportService";
const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [revenue, setRevenue] = useState("0 VNĐ");
    const [loading, setLoading] = useState(true);
    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await DashboardService.getStats();
                setStats(data.stats || []);
                setRevenue(data.revenue || "0 VNĐ");
                setRecentBookings(data.recent_bookings || []);
                // Lấy doanh thu 30 ngày gần nhất
                const to = new Date().toISOString().split("T")[0];
                const from = new Date(Date.now() - 29 * 86400000).toISOString().split("T")[0];
                setDateRange({ from, to });
                const report = await ReportService.getStats(from, to);
                setDailyRevenue(report.daily_revenue || []);
            }
            catch (err) {
                console.error("Failed to fetch stats", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    const getIconDetails = (iconName) => {
        switch (iconName) {
            case "MapPin":
                return { Icon: MapPin, color: "bg-blue-500" };
            case "Hotel":
                return { Icon: Hotel, color: "bg-emerald-500" };
            case "Utensils":
                return { Icon: Utensils, color: "bg-rose-500" };
            case "Map":
                return { Icon: Map, color: "bg-orange-500" };
            case "Users":
                return { Icon: Users, color: "bg-purple-500" };
            default:
                return { Icon: BarChart3, color: "bg-gray-500" };
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "h-full flex flex-col items-center justify-center text-gray-500 gap-3 py-32", children: [_jsx(Loader2, { className: "animate-spin text-blue-500", size: 40 }), _jsx("p", { className: "font-medium animate-pulse", children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u th\u1ED1ng k\u00EA..." })] }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex justify-between items-end", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Ch\u00E0o bu\u1ED5i s\u00E1ng, Admin! \uD83D\uDC4B" }), _jsx("p", { className: "text-gray-500 mt-1", children: "\u0110\u00E2y l\u00E0 nh\u1EEFng g\u00EC \u0111ang di\u1EC5n ra v\u1EDBi h\u1EC7 th\u1ED1ng c\u1EE7a b\u1EA1n h\u00F4m nay." })] }), _jsxs("div", { className: "bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm", children: [_jsx("p", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider", children: "T\u1ED5ng Doanh Thu" }), _jsx("p", { className: "text-xl font-bold text-blue-600", children: revenue })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: stats.map((stat, idx) => {
                    const { Icon, color } = getIconDetails(stat.icon);
                    return (_jsxs("div", { className: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsx("div", { className: `${color} p-3 rounded-xl text-white shadow-md`, children: _jsx(Icon, { size: 24 }) }), _jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full", children: [stat.trend, _jsx(ArrowUpRight, { size: 12 })] })] }), _jsx("h3", { className: "text-gray-500 text-sm font-medium", children: stat.label }), _jsx("p", { className: "text-3xl font-bold text-gray-800 mt-1 leading-tight", children: stat.value })] }, idx));
                }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col", children: [_jsxs("div", { className: "p-6 border-b border-gray-50 flex items-center justify-between", children: [_jsx("h2", { className: "font-bold text-gray-800", children: "\u0110\u01A1n \u0111\u1EB7t ch\u1ED7 g\u1EA7n \u0111\u00E2y" }), _jsx(Link, { to: "/admin/bookings", className: "text-xs font-bold text-blue-600 hover:underline", children: "Xem t\u1EA5t c\u1EA3" })] }), _jsx("div", { className: "overflow-x-auto flex-1", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-400", children: [_jsx("th", { className: "px-6 py-3", children: "Kh\u00E1ch h\u00E0ng" }), _jsx("th", { className: "px-6 py-3", children: "Lo\u1EA1i" }), _jsx("th", { className: "px-6 py-3", children: "Ng\u00E0y \u0111\u1EB7t" }), _jsx("th", { className: "px-6 py-3", children: "Tr\u1EA1ng th\u00E1i" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: recentBookings.length > 0 ? (recentBookings.map((booking) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsxs("td", { className: "px-6 py-4", children: [_jsx("p", { className: "text-sm font-bold text-gray-800", children: booking.user?.name || "Khách vãng lai" }), _jsx("p", { className: "text-[10px] text-gray-500", children: booking.user?.email })] }), _jsx("td", { className: "px-6 py-4", children: _jsx("p", { className: "text-xs font-medium text-gray-700 capitalize", children: booking.booking_type || "N/A" }) }), _jsx("td", { className: "px-6 py-4 text-xs text-gray-500", children: new Date(booking.created_at).toLocaleDateString("vi-VN") }), _jsx("td", { className: "px-6 py-4", children: _jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${booking.status === "paid"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : booking.status === "confirmed"
                                                                    ? "bg-emerald-100 text-emerald-600"
                                                                    : booking.status === "completed"
                                                                        ? "bg-cyan-100 text-cyan-600"
                                                                        : booking.status === "cancelled"
                                                                            ? "bg-red-100 text-red-600"
                                                                            : "bg-amber-100 text-amber-600"}`, children: booking.status }) })] }, booking.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-gray-400 italic text-sm", children: "Ch\u01B0a c\u00F3 d\u1EEF li\u1EC7u \u0111\u1EB7t ch\u1ED7." }) })) })] }) })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "font-bold text-gray-800", children: "Th\u1ED1ng k\u00EA nhanh" }), _jsx(Link, { to: "/admin/reports", className: "text-xs font-bold text-blue-600 hover:underline", children: "Xem b\u00E1o c\u00E1o" })] }), dailyRevenue.length > 0 ? (_jsx(_Fragment, { children: (() => {
                                    const maxRev = Math.max(...dailyRevenue.map((d) => d.revenue), 1);
                                    const totalRev = dailyRevenue.reduce((s, d) => s + d.revenue, 0);
                                    const totalOrders = dailyRevenue.reduce((s, d) => s + d.count, 0);
                                    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [_jsxs("div", { className: "bg-blue-50 rounded-xl p-3", children: [_jsx("p", { className: "text-[10px] text-blue-500 font-semibold uppercase", children: "Doanh thu" }), _jsxs("p", { className: "text-sm font-bold text-blue-700 mt-0.5", children: [totalRev.toLocaleString("vi-VN"), "\u0111"] })] }), _jsxs("div", { className: "bg-emerald-50 rounded-xl p-3", children: [_jsx("p", { className: "text-[10px] text-emerald-500 font-semibold uppercase", children: "\u0110\u01A1n \u0111\u1EB7t" }), _jsxs("p", { className: "text-sm font-bold text-emerald-700 mt-0.5", children: [totalOrders, " \u0111\u01A1n"] })] })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "text-[10px] text-gray-400 font-semibold uppercase mb-2 flex items-center gap-1", children: [_jsx(TrendingUp, { size: 12 }), " Doanh thu 30 ng\u00E0y"] }), _jsx("div", { className: "flex items-end gap-[3px] h-28", children: dailyRevenue.map((d) => {
                                                            const pct = (d.revenue / maxRev) * 100;
                                                            const dateStr = new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
                                                            return (_jsxs("div", { className: "flex-1 flex flex-col items-center group relative", children: [_jsxs("div", { className: "absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 bg-gray-800 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap shadow-lg", children: [dateStr, _jsx("br", {}), d.revenue.toLocaleString("vi-VN"), "\u0111", _jsx("br", {}), d.count, " \u0111\u01A1n"] }), _jsx("div", { className: "w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-colors min-h-[2px] cursor-pointer", style: { height: `${Math.max(pct, 3)}%` } })] }, d.date));
                                                        }) }), _jsxs("div", { className: "flex justify-between mt-1 text-[9px] text-gray-400", children: [_jsx("span", { children: new Date(dateRange.from).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) }), _jsx("span", { children: new Date(dateRange.to).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) })] })] })] }));
                                })() })) : (_jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center p-6", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(BarChart3, { size: 24 }) }), _jsx("p", { className: "text-sm font-bold text-gray-700", children: "Bi\u1EC3u \u0111\u1ED3 t\u0103ng tr\u01B0\u1EDFng" }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Ch\u01B0a c\u00F3 d\u1EEF li\u1EC7u trong 30 ng\u00E0y qua." })] }) }))] })] })] }));
};
export default Dashboard;
