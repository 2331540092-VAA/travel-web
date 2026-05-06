import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelService from "../../services/HotelService";
export default function HotelEdit() {
    const { id } = useParams();
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
        loadLocations();
        loadHotel();
    }, []);
    const loadLocations = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/locations");
            const data = await res.json();
            setLocations(data);
        }
        catch (err) {
            console.error(err);
        }
    };
    const loadHotel = async () => {
        try {
            if (!id)
                return;
            const data = await HotelService.getHotel(Number(id));
            setForm({
                location_id: data.location_id ?? "",
                name: data.name ?? "",
                rating: data.rating ?? "",
                // Loại bỏ số lẻ khi load dữ liệu lên form
                price_per_night: data.price_per_night
                    ? Math.floor(data.price_per_night).toString()
                    : "",
                discount_percent: data.discount_percent
                    ? Math.floor(data.discount_percent).toString()
                    : "0",
                combo_content: data.combo_content ?? "",
                description: data.description ?? "",
                image_url: data.image_url ?? "",
                address: data.address ?? "",
                lat: data.lat ?? "",
                lng: data.lng ?? "",
            });
        }
        catch (err) {
            console.error(err);
            alert("Cannot load hotel");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Chặn nhập ký tự lạ, chỉ cho phép nhập số nguyên cho giá và giảm giá
        if (name === "price_per_night" || name === "discount_percent") {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
            return;
        }
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id)
                return;
            await HotelService.updateHotel(Number(id), {
                ...form,
                location_id: form.location_id ? Number(form.location_id) : null,
                rating: form.rating !== "" ? Number(form.rating) : null,
                price_per_night: Number(form.price_per_night),
                discount_percent: form.discount_percent !== "" ? Number(form.discount_percent) : 0,
                lat: form.lat !== "" ? Number(form.lat) : null,
                lng: form.lng !== "" ? Number(form.lng) : null,
            });
            alert("Update hotel success");
            navigate("/admin/hotels");
        }
        catch (err) {
            console.error(err);
            alert("Update hotel failed");
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block mb-1.5 text-sm font-semibold text-gray-700";
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Edit Hotel" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u1ECBa \u0111i\u1EC3m" }), _jsxs("select", { name: "location_id", value: form.location_id, onChange: handleChange, className: inputClass, required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn \u0111\u1ECBa \u0111i\u1EC3m" }), locations.map((loc) => (_jsx("option", { value: loc.id, children: loc.name }, loc.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u00EAn kh\u00E1ch s\u1EA1n" }), _jsx("input", { name: "name", placeholder: "Nh\u1EADp t\u00EAn kh\u00E1ch s\u1EA1n", value: form.name, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 m\u1ED7i \u0111\u00EAm (VN\u0110)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "price_per_night", placeholder: "VD: 500000", value: form.price_per_night, onChange: handleChange, className: inputClass, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "discount_percent", placeholder: "VD: 10", value: form.discount_percent, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "X\u1EBFp h\u1EA1ng (Sao)" }), _jsx("input", { name: "rating", type: "number", step: "0.1", placeholder: "VD: 4.5", value: form.rating, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u1ECBa ch\u1EC9 c\u1EE5 th\u1EC3" }), _jsx("input", { name: "address", placeholder: "S\u1ED1 nh\u00E0, t\u00EAn \u0111\u01B0\u1EDDng...", value: form.address, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh (URL)" }), _jsx("input", { name: "image_url", placeholder: "D\u00E1n link \u1EA3nh t\u1EA1i \u0111\u00E2y", value: form.image_url, onChange: handleChange, className: inputClass }), form.image_url && (_jsx("div", { className: "mt-3 text-center", children: _jsx("img", { src: form.image_url, alt: "Xem tr\u01B0\u1EDBc \u1EA3nh", className: "w-32 h-20 object-cover rounded-lg border border-gray-200 mx-auto" }) }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "V\u0129 \u0111\u1ED9 (Lat)" }), _jsx("input", { name: "lat", placeholder: "V\u0129 \u0111\u1ED9", value: form.lat, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Kinh \u0111\u1ED9 (Lng)" }), _jsx("input", { name: "lng", placeholder: "Kinh \u0111\u1ED9", value: form.lng, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "N\u1ED9i dung Combo" }), _jsx("textarea", { name: "combo_content", placeholder: "Combo bao g\u1ED3m nh\u1EEFng g\u00EC?", value: form.combo_content, onChange: handleChange, rows: 2, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "M\u00F4 t\u1EA3 kh\u00E1ch s\u1EA1n" }), _jsx("textarea", { name: "description", placeholder: "Gi\u1EDBi thi\u1EC7u chung v\u1EC1 kh\u00E1ch s\u1EA1n...", value: form.description, onChange: handleChange, rows: 3, className: inputClass })] }), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-gray-50", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm", children: "C\u1EADp nh\u1EADt kh\u00E1ch s\u1EA1n" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/hotels"), className: "bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
