import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";
export default function RoomCreate() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price_per_night: "",
        capacity: "2",
        quantity: "1",
        description: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await HotelService.createRoom({
                hotel_id: Number(hotelId),
                name: form.name,
                price_per_night: Number(form.price_per_night),
                capacity: form.capacity !== undefined && form.capacity !== ""
                    ? Number(form.capacity)
                    : null,
                quantity: form.quantity !== undefined && form.quantity !== ""
                    ? Number(form.quantity)
                    : null,
                description: form.description || null,
            });
            alert("Room created successfully");
            navigate(`/admin/hotels/${hotelId}/rooms`);
        }
        catch (err) {
            console.error(err);
            alert("Create room failed");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Create Room" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsx("input", { name: "name", placeholder: "Room Name (Single, Double, Deluxe...)", value: form.name, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "price_per_night", placeholder: "Price per night", value: form.price_per_night, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "capacity", placeholder: "Capacity (people)", value: form.capacity, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "quantity", placeholder: "Number of rooms", value: form.quantity, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("textarea", { name: "description", placeholder: "Description", value: form.description, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "Create" }), _jsx("button", { type: "button", onClick: () => navigate(`/admin/hotels/${hotelId}/rooms`), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "Cancel" })] })] })] }));
}
