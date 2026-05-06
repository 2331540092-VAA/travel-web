import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Star, Eye, EyeOff, Trash2, Filter, MessageSquare, Loader2, } from "lucide-react";
import { getReviews, approveReview, rejectReview, deleteReview, } from "../../services/ReviewService";
const typeLabels = {
    tour: "Tour",
    "App\\Models\\Tour": "Tour",
    hotel: "Khách sạn",
    "App\\Models\\Hotel": "Khách sạn",
    restaurant: "Nhà hàng",
    "App\\Models\\Restaurant": "Nhà hàng",
};
const typeBadgeColor = {
    tour: "bg-orange-100 text-orange-700",
    "App\\Models\\Tour": "bg-orange-100 text-orange-700",
    hotel: "bg-emerald-100 text-emerald-700",
    "App\\Models\\Hotel": "bg-emerald-100 text-emerald-700",
    restaurant: "bg-rose-100 text-rose-700",
    "App\\Models\\Restaurant": "bg-rose-100 text-rose-700",
};
export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await getReviews(filter || undefined);
            setReviews(data);
        }
        catch (err) {
            console.error(err);
            alert("Không thể tải danh sách đánh giá");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReviews();
    }, [filter]);
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            if (currentStatus) {
                await rejectReview(id); // Chuyển thành Ẩn
            }
            else {
                await approveReview(id); // Chuyển thành Hiện
            }
            fetchReviews();
        }
        catch (err) {
            alert("Thao tác thất bại");
        }
    };
    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đánh giá này?"))
            return;
        try {
            await deleteReview(id);
            fetchReviews();
        }
        catch (err) {
            alert("Lỗi khi xóa đánh giá");
        }
    };
    const renderStars = (rating, type) => {
        // Không hiển thị sao cho Tour
        if (type && type.toLowerCase().includes("tour")) {
            return _jsx("span", { className: "text-gray-300 italic", children: "---" });
        }
        return (_jsx("div", { className: "flex justify-center", children: Array.from({ length: 5 }, (_, i) => (_jsx(Star, { size: 14, className: i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200" }, i))) }));
    };
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col justify-center items-center py-20 gap-3", children: [_jsx(Loader2, { className: "animate-spin text-indigo-500", size: 32 }), _jsx("span", { className: "text-gray-500 font-medium", children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..." })] }));
    }
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600", children: _jsx(MessageSquare, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD B\u00ECnh lu\u1EADn" }), _jsxs("p", { className: "text-xs text-gray-400", children: [reviews.length, " l\u01B0\u1EE3t ph\u1EA3n h\u1ED3i"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { size: 16, className: "text-gray-400" }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20", children: [_jsx("option", { value: "", children: "T\u1EA5t c\u1EA3 lo\u1EA1i h\u00ECnh" }), _jsx("option", { value: "tour", children: "Tour" }), _jsx("option", { value: "hotel", children: "Kh\u00E1ch s\u1EA1n" }), _jsx("option", { value: "restaurant", children: "Nh\u00E0 h\u00E0ng" })] })] })] }), _jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-gray-400 uppercase text-[11px] font-semibold tracking-wider border-b", children: [_jsx("th", { className: "px-5 py-4 text-left font-bold", children: "Kh\u00E1ch h\u00E0ng" }), _jsx("th", { className: "px-5 py-4 text-left font-bold", children: "Ph\u00E2n lo\u1EA1i" }), _jsx("th", { className: "px-5 py-4 text-center font-bold", children: "\u0110\u00E1nh gi\u00E1 sao" }), _jsx("th", { className: "px-5 py-4 text-left font-bold", children: "N\u1ED9i dung" }), _jsx("th", { className: "px-5 py-4 text-center font-bold", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-5 py-4 text-center font-bold", children: "Thao t\u00E1c" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-50", children: reviews.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "py-10 text-center text-gray-400", children: "Kh\u00F4ng c\u00F3 \u0111\u00E1nh gi\u00E1 n\u00E0o ph\u00F9 h\u1EE3p." }) })) : (reviews.map((r) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4", children: _jsx("div", { className: "font-medium text-gray-700", children: r.user?.name || `User #${r.user_id}` }) }), _jsx("td", { className: "px-5 py-4", children: _jsx("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${typeBadgeColor[r.reviewable_type] || "bg-gray-100 text-gray-600"}`, children: typeLabels[r.reviewable_type] || "N/A" }) }), _jsx("td", { className: "px-5 py-4 text-center", children: renderStars(r.rating, r.reviewable_type) }), _jsx("td", { className: "px-5 py-4 text-gray-600", children: _jsx("div", { className: "max-w-xs truncate", title: r.comment || "", children: r.comment || (_jsx("span", { className: "italic text-gray-300", children: "Tr\u1ED1ng" })) }) }), _jsx("td", { className: "px-5 py-4 text-center", children: r.is_approved ? (_jsx("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-600", children: "\u0110ang hi\u1EC7n" })) : (_jsx("span", { className: "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-400", children: "\u0110ang \u1EA9n" })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1", children: [_jsx("button", { onClick: () => handleToggleStatus(r.id, !!r.is_approved), className: `p-2 rounded-lg transition-colors ${r.is_approved
                                                            ? "hover:bg-amber-50 text-amber-600"
                                                            : "hover:bg-emerald-50 text-emerald-600"}`, title: r.is_approved ? "Ẩn bình luận" : "Hiện bình luận", children: r.is_approved ? (_jsx(EyeOff, { size: 18 })) : (_jsx(Eye, { size: 18 })) }), _jsx("button", { onClick: () => handleDelete(r.id), className: "p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors", title: "X\u00F3a v\u0129nh vi\u1EC5n", children: _jsx(Trash2, { size: 18 }) })] }) })] }, r.id)))) })] }) }) })] }));
}
