import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
export default function RestaurantTableCreate() {
    const navigate = useNavigate();
    const { restaurantId } = useParams();
    const restaurantIdNum = restaurantId ? Number(restaurantId) : null;
    const [tables, setTables] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        restaurant_id: restaurantId || "",
        name: "",
        capacity: "",
        quantity: "1",
        price: "",
        discount_percent: "0",
        note: "",
    });
    useEffect(() => {
        if (restaurantIdNum) {
            loadTables(restaurantIdNum);
        }
        setLoading(false);
    }, [restaurantIdNum]);
    const loadTables = async (id) => {
        try {
            const data = await RestaurantService.getTablesByRestaurant(id);
            setTables(data);
        }
        catch (err) {
            console.error("Lỗi khi tải danh sách bàn:", err);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Chỉ cho phép nhập số nguyên cho các trường dữ liệu số
        if (["capacity", "quantity", "price", "discount_percent"].includes(name)) {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm({ ...form, [name]: onlyNumbers });
        }
        else {
            setForm({ ...form, [name]: value });
        }
    };
    const resetForm = () => {
        setEditingId(null);
        setForm({
            restaurant_id: restaurantId || "",
            name: "",
            capacity: "",
            quantity: "1",
            price: "",
            discount_percent: "0",
            note: "",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!restaurantIdNum)
            return alert("Không tìm thấy mã nhà hàng");
        try {
            const payload = {
                ...form,
                restaurant_id: restaurantIdNum,
                capacity: Number(form.capacity),
                quantity: Number(form.quantity),
                price: Math.round(Number(form.price)),
                discount_percent: Number(form.discount_percent),
            };
            if (editingId) {
                await RestaurantService.updateTable(editingId, payload);
                alert("Cập nhật loại bàn thành công!");
            }
            else {
                await RestaurantService.createTable(payload);
                alert("Thêm loại bàn mới thành công!");
            }
            resetForm();
            loadTables(restaurantIdNum);
        }
        catch (err) {
            console.error("Lỗi lưu dữ liệu:", err);
            alert("Lỗi: Không thể lưu thông tin.");
        }
    };
    const handleEdit = (table) => {
        setEditingId(table.id);
        setForm({
            restaurant_id: String(table.restaurant_id),
            name: table.name,
            capacity: String(Math.floor(table.capacity)),
            quantity: String(Math.floor(table.quantity)),
            price: String(Math.floor(table.price || 0)),
            discount_percent: String(Math.floor(table.discount_percent || 0)),
            note: table.note || "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleDelete = async (id) => {
        if (!confirm("Bạn có chắc chắn muốn xóa loại bàn này?"))
            return;
        try {
            await RestaurantService.deleteTable(id);
            if (restaurantIdNum)
                loadTables(restaurantIdNum);
        }
        catch (err) {
            console.error("Lỗi xóa:", err);
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block mb-1 text-xs font-semibold text-gray-500 uppercase ml-1";
    if (loading)
        return _jsx("div", { className: "p-6 text-center text-gray-500", children: "\u0110ang t\u1EA3i..." });
    return (_jsxs("div", { className: "p-6 space-y-8 max-w-6xl mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD B\u00E0n \u0103n" }), _jsx("button", { onClick: () => navigate("/admin/restaurants"), className: "text-sm text-blue-600 hover:underline", children: "\u2190 Quay l\u1EA1i nh\u00E0 h\u00E0ng" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: `w-2 h-6 rounded-full ${editingId ? "bg-amber-400" : "bg-blue-600"}` }), _jsx("h2", { className: "text-lg font-bold text-gray-700", children: editingId ? "Chỉnh sửa loại bàn" : "Thêm loại bàn mới" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: labelClass, children: "T\u00EAn lo\u1EA1i b\u00E0n" }), _jsx("input", { name: "name", placeholder: "VD: B\u00E0n VIP, B\u00E0n ngo\u00E0i tr\u1EDDi...", value: form.name, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1EE9c ch\u1EE9a (Ng\u01B0\u1EDDi)" }), _jsx("input", { name: "capacity", type: "text", inputMode: "numeric", placeholder: "S\u1ED1 ng\u01B0\u1EDDi", value: form.capacity, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "S\u1ED1 l\u01B0\u1EE3ng b\u00E0n" }), _jsx("input", { name: "quantity", type: "text", inputMode: "numeric", placeholder: "S\u1ED1 b\u00E0n", value: form.quantity, onChange: handleChange, className: inputClass, required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 \u0111\u1EB7t b\u00E0n (VN\u0110)" }), _jsx("input", { name: "price", type: "text", inputMode: "numeric", placeholder: "Nh\u1EADp gi\u00E1 (VD: 300000)", value: form.price, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { name: "discount_percent", type: "text", inputMode: "numeric", value: form.discount_percent, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ghi ch\u00FA" }), _jsx("textarea", { name: "note", placeholder: "M\u00F4 t\u1EA3 th\u00EAm...", value: form.note, onChange: handleChange, className: inputClass, rows: 2 })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200", children: editingId ? "Cập nhật" : "Tạo mới" }), editingId && (_jsx("button", { type: "button", onClick: resetForm, className: "bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl font-semibold hover:bg-gray-200", children: "H\u1EE7y s\u1EEDa" }))] })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-50 bg-gray-50/30", children: _jsx("h3", { className: "font-bold text-gray-700", children: "Danh s\u00E1ch c\u00E1c lo\u1EA1i b\u00E0n hi\u1EC7n t\u1EA1i" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-[11px] uppercase tracking-wider font-bold text-gray-400 border-b border-gray-50", children: [_jsx("th", { className: "px-6 py-4", children: "STT" }), _jsx("th", { className: "px-6 py-4", children: "T\u00EAn b\u00E0n" }), _jsx("th", { className: "px-6 py-4 text-center", children: "S\u1EE9c ch\u1EE9a" }), _jsx("th", { className: "px-6 py-4 text-center", children: "S\u1ED1 l\u01B0\u1EE3ng" }), _jsx("th", { className: "px-6 py-4 text-right", children: "Gi\u00E1 b\u00E1n" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Gi\u1EA3m gi\u00E1" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Thao t\u00E1c" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [tables.map((table, index) => (_jsxs("tr", { className: "hover:bg-blue-50/30 transition-colors", children: [_jsx("td", { className: "px-6 py-4 text-sm text-gray-500 font-medium", children: index + 1 }), _jsx("td", { className: "px-6 py-4 text-sm font-bold text-gray-700", children: table.name }), _jsxs("td", { className: "px-6 py-4 text-sm text-gray-600 text-center", children: [table.capacity, " ng\u01B0\u1EDDi"] }), _jsxs("td", { className: "px-6 py-4 text-sm text-gray-600 text-center", children: [table.quantity, " b\u00E0n"] }), _jsxs("td", { className: "px-6 py-4 text-sm font-medium text-right", children: [new Intl.NumberFormat("vi-VN").format(Math.floor(table.price || 0)), " ", "VN\u0110"] }), _jsxs("td", { className: "px-6 py-4 text-sm text-red-500 text-center", children: [table.discount_percent, "%"] }), _jsxs("td", { className: "px-6 py-4 text-sm flex justify-center gap-2", children: [_jsx("button", { onClick: () => handleEdit(table), className: "p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors", children: "S\u1EEDa" }), _jsx("button", { onClick: () => handleDelete(table.id), className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors", children: "X\u00F3a" })] })] }, table.id))), tables.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-6 py-10 text-center text-gray-400 italic", children: "Ch\u01B0a c\u00F3 lo\u1EA1i b\u00E0n n\u00E0o \u0111\u01B0\u1EE3c t\u1EA1o." }) }))] })] }) })] })] }));
}
