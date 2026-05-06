import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";
export default function HotelRooms() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({
        id: 0,
        name: "",
        price_per_night: "",
        capacity: "2",
        quantity: "1",
        description: "",
    });
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        loadRooms();
    }, []);
    const loadRooms = async () => {
        try {
            if (!hotelId)
                return;
            const data = await HotelService.getRoomsByHotel(Number(hotelId));
            setRooms(data);
        }
        catch (err) {
            console.error(err);
            alert("Cannot load rooms");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Chặn nhập ký tự không phải số cho các trường định lượng
        if (["price_per_night", "capacity", "quantity"].includes(name)) {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
            return;
        }
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const resetForm = () => {
        setForm({
            id: 0,
            name: "",
            price_per_night: "",
            capacity: "2",
            quantity: "1",
            description: "",
        });
        setEditing(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                hotel_id: Number(hotelId),
                name: form.name,
                price_per_night: Number(form.price_per_night),
                capacity: form.capacity !== "" ? Number(form.capacity) : 2,
                quantity: form.quantity !== "" ? Number(form.quantity) : 1,
                description: form.description || null,
            };
            if (editing) {
                await HotelService.updateRoom(form.id, payload);
                alert("Room updated");
            }
            else {
                await HotelService.createRoom(payload);
                alert("Room created");
            }
            resetForm();
            loadRooms();
        }
        catch (err) {
            console.error(err);
            alert("Save failed");
        }
    };
    const handleEdit = (room) => {
        setEditing(true);
        setForm({
            id: room.id,
            name: room.name,
            // Dùng Math.floor để đảm bảo không hiển thị .00 khi đưa vào input
            price_per_night: room.price_per_night
                ? Math.floor(room.price_per_night).toString()
                : "",
            capacity: room.capacity ? Math.floor(room.capacity).toString() : "2",
            quantity: room.quantity ? Math.floor(room.quantity).toString() : "1",
            description: room.description || "",
        });
        // Cuộn lên đầu để người dùng thấy form edit
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleDelete = async (id) => {
        if (!confirm("Delete this room?"))
            return;
        try {
            await HotelService.deleteRoom(id);
            setRooms(rooms.filter((r) => r.id !== id));
        }
        catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Ph\u00F2ng Kh\u00E1ch s\u1EA1n" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-6 space-y-5", children: [_jsx("h2", { className: "font-bold text-lg text-blue-600", children: editing ? "📝 Chỉnh sửa phòng" : "➕ Thêm phòng mới" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 ml-1", children: "T\u00EAn ph\u00F2ng" }), _jsx("input", { name: "name", placeholder: "VD: Ph\u00F2ng Deluxe H\u01B0\u1EDBng Bi\u1EC3n", value: form.name, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 ml-1", children: "Gi\u00E1/\u0111\u00EAm (VN\u0110)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "price_per_night", placeholder: "VD: 1500000", value: form.price_per_night, onChange: handleChange, className: inputClass, required: true })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 ml-1", children: "S\u1EE9c ch\u1EE9a (Ng\u01B0\u1EDDi)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "capacity", placeholder: "M\u1EB7c \u0111\u1ECBnh: 2", value: form.capacity, onChange: handleChange, className: inputClass })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 ml-1", children: "S\u1ED1 l\u01B0\u1EE3ng ph\u00F2ng hi\u1EC7n c\u00F3" }), _jsx("input", { type: "text", inputMode: "numeric", name: "quantity", placeholder: "M\u1EB7c \u0111\u1ECBnh: 1", value: form.quantity, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 ml-1", children: "M\u00F4 t\u1EA3 ph\u00F2ng" }), _jsx("textarea", { name: "description", placeholder: "M\u00F4 t\u1EA3 ti\u1EC7n nghi ph\u00F2ng...", value: form.description, onChange: handleChange, rows: 2, className: inputClass })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200", children: editing ? "Cập nhật" : "Tạo phòng" }), editing && (_jsx("button", { type: "button", onClick: resetForm, className: "bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors", children: "H\u1EE7y s\u1EEDa" })), _jsx("button", { type: "button", onClick: () => navigate("/admin/hotels"), className: "bg-white border border-gray-200 text-gray-500 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors", children: "Quay l\u1EA1i" })] })] }), _jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-gray-50 bg-gray-50/50", children: _jsx("h3", { className: "font-bold text-gray-700", children: "Danh s\u00E1ch ph\u00F2ng hi\u1EC7n c\u00F3" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left", children: "STT" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "T\u00EAn ph\u00F2ng" }), _jsx("th", { className: "px-5 py-3.5 text-right", children: "Gi\u00E1/\u0111\u00EAm" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "S\u1EE9c ch\u1EE9a" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "S\u1ED1 l\u01B0\u1EE3ng" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "M\u00F4 t\u1EA3" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Thao t\u00E1c" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [rooms.map((room, idx) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: idx + 1 }), _jsx("td", { className: "px-5 py-4 text-sm font-semibold text-gray-700", children: room.name }), _jsxs("td", { className: "px-5 py-4 text-sm font-bold text-blue-600 text-right", children: [new Intl.NumberFormat("vi-VN").format(Math.floor(room.price_per_night || 0)), " ", "VN\u0110"] }), _jsxs("td", { className: "px-5 py-4 text-sm text-center text-gray-600", children: [room.capacity, " ng\u01B0\u1EDDi"] }), _jsx("td", { className: "px-5 py-4 text-sm text-center text-gray-600", children: room.quantity }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500 max-w-xs truncate", children: room.description || "—" }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600 text-center", children: _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx("button", { onClick: () => handleEdit(room), className: "bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-100 transition-colors text-xs", children: "S\u1EEDa" }), _jsx("button", { onClick: () => handleDelete(room.id), className: "bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-colors text-xs", children: "X\u00F3a" })] }) })] }, room.id))), rooms.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "text-center p-8 text-gray-400 italic", children: "Ch\u01B0a c\u00F3 ph\u00F2ng n\u00E0o \u0111\u01B0\u1EE3c t\u1EA1o cho kh\u00E1ch s\u1EA1n n\u00E0y." }) }))] })] }) })] })] }));
}
