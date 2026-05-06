import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FileText, Download, TrendingUp, ShoppingCart, CreditCard, Calendar, BarChart3, PieChart, } from "lucide-react";
import ReportService from "../../services/ReportService";
const typeLabels = {
    tour: "Tour",
    hotel: "Khách sạn",
    restaurant: "Nhà hàng",
};
const typeColors = {
    tour: "bg-blue-500",
    hotel: "bg-amber-500",
    restaurant: "bg-emerald-500",
};
const statusLabels = {
    pending: "Chờ xử lý",
    confirmed: "Đã xác nhận",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    paid: "Đã thanh toán",
};
const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    paid: "bg-purple-100 text-purple-700",
};
const Reports = () => {
    const [from, setFrom] = useState(() => {
        const d = new Date();
        d.setDate(1);
        return d.toISOString().split("T")[0];
    });
    const [to, setTo] = useState(() => new Date().toISOString().split("T")[0]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await ReportService.getStats(from, to);
            setData(result);
        }
        catch (err) {
            console.error("Error loading report:", err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleExport = () => {
        window.open(ReportService.getExportUrl(from, to), "_blank");
    };
    const formatMoney = (v) => v.toLocaleString("vi-VN") + "đ";
    const maxDailyRevenue = data?.daily_revenue?.length
        ? Math.max(...data.daily_revenue.map((d) => d.revenue))
        : 0;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-800 flex items-center gap-2", children: [_jsx(FileText, { className: "text-blue-600", size: 28 }), "B\u00E1o c\u00E1o doanh thu"] }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Th\u1ED1ng k\u00EA v\u00E0 xu\u1EA5t b\u00E1o c\u00E1o theo kho\u1EA3ng th\u1EDDi gian" })] }), _jsxs("button", { onClick: handleExport, className: "flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all", children: [_jsx(Download, { size: 18 }), "Xu\u1EA5t PDF"] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-end gap-4 flex-wrap", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs font-medium text-gray-500 mb-1 block", children: "T\u1EEB ng\u00E0y" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 16 }), _jsx("input", { type: "date", value: from, onChange: (e) => setFrom(e.target.value), className: "pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 outline-none" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs font-medium text-gray-500 mb-1 block", children: "\u0110\u1EBFn ng\u00E0y" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 16 }), _jsx("input", { type: "date", value: to, onChange: (e) => setTo(e.target.value), className: "pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 outline-none" })] })] }), _jsx("button", { onClick: fetchData, disabled: loading, className: "px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50", children: loading ? "Đang tải..." : "Xem báo cáo" })] }), data && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-3 gap-5", children: [_jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center", children: _jsx(ShoppingCart, { size: 20, className: "text-blue-600" }) }), _jsx("span", { className: "text-sm text-gray-500", children: "T\u1ED5ng \u0111\u01A1n \u0111\u1EB7t" })] }), _jsx("p", { className: "text-3xl font-bold text-gray-800", children: data.total_bookings.toLocaleString() })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center", children: _jsx(TrendingUp, { size: 20, className: "text-emerald-600" }) }), _jsx("span", { className: "text-sm text-gray-500", children: "Doanh thu" })] }), _jsx("p", { className: "text-3xl font-bold text-gray-800", children: formatMoney(data.total_revenue) })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center", children: _jsx(CreditCard, { size: 20, className: "text-purple-600" }) }), _jsx("span", { className: "text-sm text-gray-500", children: "\u0110\u00E3 thanh to\u00E1n" })] }), _jsx("p", { className: "text-3xl font-bold text-gray-800", children: formatMoney(data.paid_revenue) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-5", children: [_jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center gap-2 mb-4", children: [_jsx(PieChart, { size: 18, className: "text-blue-600" }), "Theo lo\u1EA1i d\u1ECBch v\u1EE5"] }), _jsxs("div", { className: "space-y-3", children: [data.by_type.map((item) => {
                                                const pct = data.total_revenue > 0
                                                    ? (item.revenue / data.total_revenue) * 100
                                                    : 0;
                                                return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: typeLabels[item.booking_type] || item.booking_type }), _jsxs("span", { className: "text-sm text-gray-500", children: [item.count, " \u0111\u01A1n \u00B7 ", formatMoney(item.revenue)] })] }), _jsx("div", { className: "h-2.5 bg-gray-100 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full rounded-full ${typeColors[item.booking_type] || "bg-gray-400"}`, style: { width: `${pct}%` } }) })] }, item.booking_type));
                                            }), data.by_type.length === 0 && (_jsx("p", { className: "text-sm text-gray-400 text-center py-4", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" }))] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center gap-2 mb-4", children: [_jsx(BarChart3, { size: 18, className: "text-blue-600" }), "Theo tr\u1EA1ng th\u00E1i"] }), _jsxs("div", { className: "space-y-2.5", children: [data.by_status.map((item) => (_jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-lg bg-gray-50", children: [_jsx("span", { className: `text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[item.status] ||
                                                            "bg-gray-100 text-gray-600"}`, children: statusLabels[item.status] || item.status }), _jsx("span", { className: "text-sm font-bold text-gray-700", children: item.count })] }, item.status))), data.by_status.length === 0 && (_jsx("p", { className: "text-sm text-gray-400 text-center py-4", children: "Kh\u00F4ng c\u00F3 d\u1EEF li\u1EC7u" }))] })] })] }), data.by_payment_method.length > 0 && (_jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center gap-2 mb-4", children: [_jsx(CreditCard, { size: 18, className: "text-blue-600" }), "Ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n"] }), _jsx("div", { className: "grid grid-cols-3 gap-4", children: data.by_payment_method.map((item) => (_jsxs("div", { className: "bg-gray-50 rounded-xl p-4 text-center", children: [_jsx("p", { className: "text-lg font-bold text-gray-800 uppercase", children: item.method }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [item.count, " giao d\u1ECBch"] }), _jsx("p", { className: "text-sm font-semibold text-blue-600 mt-1", children: formatMoney(item.total) })] }, item.method))) })] })), data.daily_revenue.length > 0 && (_jsxs("div", { className: "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm", children: [_jsxs("h3", { className: "font-bold text-gray-800 flex items-center gap-2 mb-4", children: [_jsx(TrendingUp, { size: 18, className: "text-blue-600" }), "Doanh thu theo ng\u00E0y"] }), _jsx("div", { className: "flex items-end gap-1 h-40", children: data.daily_revenue.map((d) => {
                                    const pct = maxDailyRevenue > 0
                                        ? (d.revenue / maxDailyRevenue) * 100
                                        : 0;
                                    return (_jsxs("div", { className: "flex-1 flex flex-col items-center group relative", children: [_jsx("div", { className: "w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm min-h-[2px] hover:from-blue-700 hover:to-blue-500 transition-colors", style: { height: `${Math.max(pct, 2)}%` } }), _jsxs("div", { className: "absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10", children: [new Date(d.date).toLocaleDateString("vi-VN"), ":", " ", formatMoney(d.revenue), " (", d.count, " \u0111\u01A1n)"] })] }, d.date));
                                }) }), _jsxs("div", { className: "flex justify-between mt-2 text-[10px] text-gray-400", children: [_jsx("span", { children: new Date(data.daily_revenue[0].date).toLocaleDateString("vi-VN") }), _jsx("span", { children: new Date(data.daily_revenue[data.daily_revenue.length - 1].date).toLocaleDateString("vi-VN") })] })] }))] }))] }));
};
export default Reports;
