import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationService from "../../services/LocationService";
export default function LocationEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [form, setForm] = useState({
        country_id: "",
        name: "",
        description: "",
        content: "",
        address: "",
        province: "",
        lat: "",
        lng: "",
        image_url: "",
    });
    // lấy danh sách country
    const fetchCountries = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/countries");
            const data = await res.json();
            setCountries(data);
        }
        catch (err) {
            console.error(err);
        }
    };
    // lấy location để edit
    const fetchLocation = async () => {
        try {
            const data = await LocationService.getLocation(Number(id));
            setForm({
                country_id: data.country_id ? String(data.country_id) : "",
                name: data.name || "",
                description: data.description || "",
                content: data.content || "",
                address: data.address || "",
                province: data.province || "",
                lat: data.lat ? String(data.lat) : "",
                lng: data.lng ? String(data.lng) : "",
                image_url: data.image_url || "",
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchCountries();
        if (id)
            fetchLocation();
    }, [id]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LocationService.updateLocation(Number(id), {
                ...form,
                country_id: Number(form.country_id),
                lat: form.lat ? Number(form.lat) : null,
                lng: form.lng ? Number(form.lng) : null,
            });
            alert("Update success");
            navigate("/admin/locations");
        }
        catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto space-y-6", children: [" ", _jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Edit Location" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("select", { name: "country_id", value: form.country_id, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn Qu\u1ED1c gia" }), countries.map((country) => (_jsx("option", { value: country.id, children: country.name }, country.id)))] }), _jsx("input", { name: "name", value: form.name, onChange: handleChange, placeholder: "T\u00EAn \u0111\u1ECBa \u0111i\u1EC3m", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("textarea", { name: "description", value: form.description, onChange: handleChange, placeholder: "M\u00F4 t\u1EA3", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("textarea", { name: "content", value: form.content, onChange: handleChange, placeholder: "N\u1ED9i dung chi ti\u1EBFt", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "address", value: form.address, onChange: handleChange, placeholder: "\u0110\u1ECBa ch\u1EC9", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "province", value: form.province, onChange: handleChange, placeholder: "T\u1EC9nh/Th\u00E0nh ph\u1ED1", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "lat", value: form.lat, onChange: handleChange, placeholder: "V\u0129 \u0111\u1ED9 (Latitude)", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "lng", value: form.lng, onChange: handleChange, placeholder: "Kinh \u0111\u1ED9 (Longitude)", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "image_url", value: form.image_url, onChange: handleChange, placeholder: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh (URL)", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "C\u1EADp nh\u1EADt" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/locations"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y" })] })] })] }));
}
