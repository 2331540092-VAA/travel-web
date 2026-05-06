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
        discount_percent: 0,
        note: "",
    });
    useEffect(() => {
        const initData = async () => {
            await loadRestaurants();
            await loadTable();
        };
        initData();
    }, [id]);
    const loadTable = async () => {
        try {
            const tableId = id ? Number(id) : undefined;
            if (!tableId)
                throw new Error("ID không hợp lệ");
            const data = await RestaurantService.getTable(tableId);
            setForm({
                restaurant_id: data.restaurant_id || "",
                name: data.name || "",
                capacity: data.capacity || "",
                quantity: data.quantity || "",
                price: data.price || "",
                discount_percent: data.discount_percent || 0,
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
    const loadRestaurants = async () => {
        try {
            const data = await RestaurantService.getRestaurants();
            setRestaurants(data);
        }
        catch (error) {
            console.error("Lỗi tải danh sách nhà hàng:", error);
        }
    };
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tableId = id ? Number(id) : undefined;
            if (!tableId)
                throw new Error("ID không hợp lệ");
            const payload = {
                ...form,
                restaurant_id: Number(form.restaurant_id),
                capacity: Number(form.capacity),
                quantity: Number(form.quantity),
                price: Math.round(Number(form.price)), // Đảm bảo là số nguyên
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
    const labelClass = "block mb-1.5 text-sm font-semibold text-gray-700";
    if (loading) {
        return (_jsx("div", { className: "p-6 text-center text-gray-500", children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..." }));
    }
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Ch\u1EC9nh s\u1EEDa B\u00E0n \u0103n" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Thu\u1ED9c Nh\u00E0 h\u00E0ng" }), _jsxs("select", { name: "restaurant_id", value: form.restaurant_id, onChange: handleChange, className: inputClass, required: true, children: [_jsx("option", { value: "", children: "-- Ch\u1ECDn nh\u00E0 h\u00E0ng --" }), restaurants.map((res) => (_jsx("option", { value: res.id, children: res.name }, res.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u00EAn lo\u1EA1i b\u00E0n (VD: B\u00E0n 4 ng\u01B0\u1EDDi)" }), _jsx("input", { name: "name", value: form.name, onChange: handleChange, required: true, className: inputClass })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1EE9c ch\u1EE9a (ng\u01B0\u1EDDi/b\u00E0n)" }), _jsx("input", { type: "number", name: "capacity", value: form.capacity, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1ED1 l\u01B0\u1EE3ng b\u00E0n c\u00F3 s\u1EB5n" }), _jsx("input", { type: "number", name: "quantity", value: form.quantity, onChange: handleChange, className: inputClass, required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 \u0111\u1EB7t b\u00E0n (VN\u0110)" }), _jsx("input", { type: "number", name: "price", step: "1", value: form.price, onChange: handleChange, onKeyDown: (e) => {
                                            if (e.key === "." || e.key === ",")
                                                e.preventDefault();
                                        }, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { type: "number", name: "discount_percent", value: form.discount_percent, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ghi ch\u00FA / M\u00F4 t\u1EA3 b\u00E0n" }), _jsx("textarea", { name: "note", value: form.note, onChange: handleChange, rows: 3, placeholder: "VD: G\u1EA7n c\u1EEDa s\u1ED5, view bi\u1EC3n...", className: inputClass })] }), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-gray-50", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200", children: "C\u1EADp nh\u1EADt B\u00E0n" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/restaurant-tables"), className: "bg-white text-gray-600 border border-gray-200 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
