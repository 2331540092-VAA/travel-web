import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelService from "../../services/HotelService";
export default function HotelCreate() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({
        location_id: "",
        name: "",
        rating: "",
        price_per_night: "",
        discount_percent: "0",
        combo_content: "",
        description: "",
        image_url: "",
        address: "",
        lat: "",
        lng: "",
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data))
            .catch((err) => console.error(err));
    }, []);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await HotelService.createHotel({
                ...form,
                location_id: form.location_id ? Number(form.location_id) : null,
                rating: form.rating !== undefined && form.rating !== ""
                    ? Number(form.rating)
                    : null,
                price_per_night: Number(form.price_per_night),
                discount_percent: form.discount_percent !== undefined && form.discount_percent !== ""
                    ? Number(form.discount_percent)
                    : null,
                lat: form.lat !== undefined && form.lat !== "" ? Number(form.lat) : null,
                lng: form.lng !== undefined && form.lng !== "" ? Number(form.lng) : null,
            });
            alert("Create hotel success");
            navigate("/admin/hotels");
        }
        catch (err) {
            console.error(err);
            alert("Create hotel failed");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Create Hotel" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("select", { name: "location_id", value: form.location_id, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn \u0111\u1ECBa \u0111i\u1EC3m" }), locations.map((loc) => (_jsx("option", { value: loc.id, children: loc.name }, loc.id)))] }), _jsx("input", { name: "name", placeholder: "T\u00EAn kh\u00E1ch s\u1EA1n", value: form.name, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "rating", placeholder: "X\u1EBFp h\u1EA1ng (1 - 5 sao)", value: form.rating, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "price_per_night", placeholder: "Gi\u00E1 m\u1ED7i \u0111\u00EAm", value: form.price_per_night, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "discount_percent", placeholder: "Ph\u1EA7n tr\u0103m gi\u1EA3m gi\u00E1 (%)", value: form.discount_percent, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "address", placeholder: "\u0110\u1ECBa ch\u1EC9 c\u1EE5 th\u1EC3", value: form.address, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh (URL)" }), _jsx("input", { name: "image_url", placeholder: "Nh\u1EADp link \u1EA3nh t\u1EA1i \u0111\u00E2y", value: form.image_url, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), form.image_url && (_jsx("div", { className: "my-2 text-center", children: _jsx("img", { src: form.image_url, alt: "xem tr\u01B0\u1EDBc", className: "w-48 rounded shadow mx-auto" }) })), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { name: "lat", placeholder: "V\u0129 \u0111\u1ED9 (Lat)", value: form.lat, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "lng", placeholder: "Kinh \u0111\u1ED9 (Lng)", value: form.lng, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsx("textarea", { name: "combo_content", placeholder: "N\u1ED9i dung g\u00F3i Combo (n\u1EBFu c\u00F3)", value: form.combo_content, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("textarea", { name: "description", placeholder: "M\u00F4 t\u1EA3 kh\u00E1ch s\u1EA1n", value: form.description, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "T\u1EA1o m\u1EDBi" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/hotels"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
