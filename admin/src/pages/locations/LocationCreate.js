import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationService from "../../services/LocationService";
export default function LocationCreate() {
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
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/countries")
            .then((res) => res.json())
            .then((data) => setCountries(data))
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
            await LocationService.createLocation({
                ...form,
                country_id: Number(form.country_id),
                lat: form.lat ? Number(form.lat) : null,
                lng: form.lng ? Number(form.lng) : null,
            });
            alert("Create location success");
            navigate("/admin/locations");
        }
        catch (err) {
            console.error(err);
            alert("Create failed");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Create Location" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("select", { name: "country_id", value: form.country_id, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn qu\u1ED1c gia" }), countries.map((country) => (_jsx("option", { value: country.id, children: country.name }, country.id)))] }), _jsx("input", { name: "name", placeholder: "T\u00EAn \u0111\u1ECBa \u0111i\u1EC3m", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("textarea", { name: "description", placeholder: "M\u00F4 t\u1EA3 ng\u1EAFn", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("textarea", { name: "content", placeholder: "N\u1ED9i dung chi ti\u1EBFt", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "address", placeholder: "\u0110\u1ECBa ch\u1EC9", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "province", placeholder: "T\u1EC9nh / Th\u00E0nh ph\u1ED1", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "lat", placeholder: "V\u0129 \u0111\u1ED9 (Latitude)", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "lng", placeholder: "Kinh \u0111\u1ED9 (Longitude)", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "image_url", placeholder: "\u0110\u01B0\u1EDDng d\u1EABn h\u00ECnh \u1EA3nh (URL)", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "T\u1EA1o m\u1EDBi" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/locations"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
