import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TourService from "../../services/TourService";
export default function TourDepartureCreate() {
    const { id } = useParams(); // tour id
    const navigate = useNavigate();
    const [tourName, setTourName] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        departure_date: "",
        capacity: "20",
        price: "",
        discount_percent: "0",
        is_promotion: false,
        promotion_end: "",
        status: "available", // Theo migration: available
    });
    // Khai báo các class đồng bộ với form chỉnh sửa
    const labelClass = "block mb-1 text-sm font-semibold text-gray-700";
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    useEffect(() => {
        if (id)
            fetchTourName();
    }, [id]);
    async function fetchTourName() {
        try {
            const tour = await TourService.getTour(Number(id));
            setTourName(tour.name || "");
        }
        catch {
            setTourName("");
        }
    }
    function handleChange(e) {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? e.target.checked : value;
        setFormData({
            ...formData,
            [name]: val,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!id)
            return;
        setLoading(true);
        try {
            await TourService.createDeparture({
                tour_id: Number(id),
                departure_date: formData.departure_date,
                capacity: Number(formData.capacity),
                booked: 0, // Mặc định khi tạo mới là 0
                price: Number(formData.price),
                discount_percent: Number(formData.discount_percent),
                is_promotion: formData.is_promotion,
                promotion_end: formData.is_promotion ? formData.promotion_end : null,
                status: formData.status,
            });
            alert("Thêm ngày khởi hành thành công!");
            navigate(`/admin/tours/${id}/departures`);
        }
        catch (error) {
            console.error("Lỗi tạo:", error);
            alert("Không thể tạo ngày khởi hành.");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm Ng\u00E0y kh\u1EDFi h\u00E0nh M\u1EDBi" }), _jsxs("p", { className: "text-blue-600 font-medium italic text-sm", children: ["Tour: ", tourName] })] }) }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ng\u00E0y kh\u1EDFi h\u00E0nh" }), _jsx("input", { type: "date", name: "departure_date", value: formData.departure_date, onChange: handleChange, required: true, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Tr\u1EA1ng th\u00E1i" }), _jsxs("select", { name: "status", value: formData.status, onChange: handleChange, className: inputClass, children: [_jsx("option", { value: "available", children: "S\u1EB5n c\u00F3 (Available)" }), _jsx("option", { value: "full", children: "\u0110\u1EA7y ch\u1ED7 (Full)" }), _jsx("option", { value: "closed", children: "\u0110\u00E3 \u0111\u00F3ng (Closed)" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 g\u1ED1c (VN\u0110)" }), _jsx("input", { name: "price", type: "text", inputMode: "numeric", value: formData.price, onChange: handleChange, required: true, placeholder: "VD: 1500000", className: inputClass }), formData.price && (_jsxs("p", { className: "mt-1 text-[11px] text-gray-500 italic", children: ["\u0110\u1ECBnh d\u1EA1ng: ", Number(formData.price).toLocaleString("vi-VN"), " VN\u0110"] }))] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { name: "discount_percent", type: "text", inputMode: "numeric", value: formData.discount_percent, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u1ED5ng s\u1ED1 ch\u1ED7 (Capacity)" }), _jsx("input", { type: "number", name: "capacity", value: formData.capacity, onChange: handleChange, required: true, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1ED1 ch\u1ED7 \u0111\u00E3 \u0111\u1EB7t" }), _jsx("input", { type: "number", value: 0, disabled: true, className: `${inputClass} bg-gray-100 cursor-not-allowed` })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 items-end", children: [_jsxs("div", { className: "flex items-center gap-3 py-2.5", children: [_jsx("input", { type: "checkbox", id: "is_promotion", name: "is_promotion", checked: formData.is_promotion, onChange: handleChange, className: "w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" }), _jsx("label", { htmlFor: "is_promotion", className: "block text-sm font-semibold text-gray-700 cursor-pointer", children: "K\u00EDch ho\u1EA1t \u01B0u \u0111\u00E3i" })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ng\u00E0y h\u1EBFt h\u1EA1n \u01B0u \u0111\u00E3i" }), _jsx("input", { type: "datetime-local", name: "promotion_end", value: formData.promotion_end, onChange: handleChange, className: `${inputClass} disabled:opacity-50` })] })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 disabled:bg-blue-300", children: loading ? "Đang tạo..." : "Thêm Ngày khởi hành" }), _jsx("button", { type: "button", onClick: () => navigate(`/admin/tours/${id}/departures`), className: "flex-1 bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
