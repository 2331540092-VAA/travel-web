import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
export default function RestaurantTableEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [form, setForm] = useState({
        restaurant_id: "",
        name: "",
        capacity: "",
        quantity: "",
        price: "",
        discount_percent: "0",
        note: "",
    });
    useEffect(() => {
        const initData = async () => {
            await loadRestaurants();
            await loadTable();
        };
        initData();
    }, [id]);
    const loadRestaurants = async () => {
        try {
            const data = await RestaurantService.getRestaurants();
            setRestaurants(data);
        }
        catch (error) {
            console.error("Lỗi tải danh sách nhà hàng:", error);
        }
    };
    const loadTable = async () => {
        try {
            const tableId = id ? Number(id) : undefined;
            if (!tableId || isNaN(tableId))
                throw new Error("ID không hợp lệ");
            const data = await RestaurantService.getTable(tableId);
            setForm({
                restaurant_id: data.restaurant_id || "",
                name: data.name || "",
                capacity: data.capacity || "",
                quantity: data.quantity || "",
                // Ép kiểu về số nguyên và chuyển thành chuỗi để input text hiển thị sạch
                price: data.price ? Math.floor(Number(data.price)).toString() : "",
                discount_percent: data.discount_percent
                    ? Math.floor(Number(data.discount_percent)).toString()
                    : "0",
                note: data.note || "",
            });
        }
        catch (error) {
            console.error("Lỗi khi tải dữ liệu bàn:", error);
            alert("Không thể tải thông tin bàn ăn");
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Nếu là ô price hoặc discount_percent, chỉ cho phép nhập số (loại bỏ mọi ký tự khác)
        if (name === "price" || name === "discount_percent") {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
        }
        else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tableId = id ? Number(id) : undefined;
            if (!tableId || isNaN(tableId))
                throw new Error("ID không hợp lệ");
            const payload = {
                ...form,
                restaurant_id: Number(form.restaurant_id),
                capacity: Number(form.capacity),
                quantity: Number(form.quantity),
                price: Math.round(Number(form.price)),
                discount_percent: Number(form.discount_percent),
            };
            await RestaurantService.updateTable(tableId, payload);
            alert("Cập nhật thông tin bàn thành công!");
            navigate("/admin/restaurant-tables");
        }
        catch (error) {
            console.error("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại!");
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block mb-1 text-xs font-semibold text-gray-500 uppercase ml-1";
    if (loading)
        return _jsx("div", { className: "p-6 text-center text-gray-500", children: "\u0110ang t\u1EA3i..." });
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Ch\u1EC9nh s\u1EEDa B\u00E0n \u0103n" }), _jsx("button", { onClick: () => navigate("/admin/restaurant-tables"), className: "text-sm text-blue-600 hover:underline", children: "\u2190 Quay l\u1EA1i danh s\u00E1ch" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Thu\u1ED9c Nh\u00E0 h\u00E0ng" }), _jsxs("select", { name: "restaurant_id", value: form.restaurant_id, onChange: handleChange, className: inputClass, required: true, children: [_jsx("option", { value: "", children: "-- Ch\u1ECDn nh\u00E0 h\u00E0ng --" }), restaurants.map((res) => (_jsx("option", { value: res.id, children: res.name }, res.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u00EAn lo\u1EA1i b\u00E0n" }), _jsx("input", { name: "name", value: form.name, onChange: handleChange, placeholder: "VD: B\u00E0n VIP", className: inputClass, required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1EE9c ch\u1EE9a (Ng\u01B0\u1EDDi)" }), _jsx("input", { name: "capacity", type: "number", value: form.capacity, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1ED1 l\u01B0\u1EE3ng b\u00E0n" }), _jsx("input", { name: "quantity", type: "number", value: form.quantity, onChange: handleChange, className: inputClass, required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 \u0111\u1EB7t b\u00E0n (VN\u0110)" }), _jsx("input", { name: "price", type: "text", inputMode: "numeric", value: form.price, onChange: handleChange, placeholder: "Nh\u1EADp gi\u00E1 (VD: 300000)", className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { name: "discount_percent", type: "text", inputMode: "numeric", value: form.discount_percent, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ghi ch\u00FA / M\u00F4 t\u1EA3" }), _jsx("textarea", { name: "note", value: form.note, onChange: handleChange, className: inputClass, rows: 3, placeholder: "M\u00F4 t\u1EA3 th\u00EAm v\u1EC1 lo\u1EA1i b\u00E0n n\u00E0y..." })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200", children: "L\u01B0u thay \u0111\u1ED5i" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/restaurant-tables"), className: "bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-all", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
