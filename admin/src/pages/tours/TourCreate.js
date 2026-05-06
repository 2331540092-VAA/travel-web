import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TourService from "../../services/TourService";
export default function TourCreate() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        location_id: "",
        name: "",
        days: "",
        transport: "",
        departure_location: "",
        description: "",
        content: "",
        combo_content: "",
        image_url: "",
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data))
            .catch((err) => console.error("Load locations failed:", err));
    }, []);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...formData,
            location_id: formData.location_id ? Number(formData.location_id) : null,
            days: formData.days ? Number(formData.days) : null,
            transport: formData.transport || null,
            departure_location: formData.departure_location || null,
            description: formData.description || null,
            content: formData.content || null,
            combo_content: formData.combo_content || null,
            image_url: formData.image_url || null,
        };
        try {
            await TourService.createTour(payload);
            alert("Tạo tour mới thành công!");
            navigate("/admin/tours");
        }
        catch (error) {
            console.error("Create tour failed:", error);
            alert("Lỗi khi tạo tour");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "p-6 max-w-4xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm Tour M\u1EDBi" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "T\u00EAn Tour" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Khu v\u1EF1c" }), _jsxs("select", { name: "location_id", value: formData.location_id, onChange: handleChange, required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "", children: "Ch\u1ECDn khu v\u1EF1c" }), locations.map((loc) => (_jsx("option", { value: loc.id, children: loc.name }, loc.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "S\u1ED1 ng\u00E0y" }), _jsx("input", { type: "number", name: "days", value: formData.days, onChange: handleChange, required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Ph\u01B0\u01A1ng ti\u1EC7n" }), _jsx("input", { type: "text", name: "transport", placeholder: "M\u00E1y bay, \u00D4 t\u00F4...", value: formData.transport, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "\u0110i\u1EC3m kh\u1EDFi h\u00E0nh" }), _jsx("input", { type: "text", name: "departure_location", placeholder: "V\u00ED d\u1EE5: TP.HCM", value: formData.departure_location, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Link h\u00ECnh \u1EA3nh" }), _jsx("input", { type: "text", name: "image_url", value: formData.image_url, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "N\u1ED9i dung Combo" }), _jsx("textarea", { name: "combo_content", value: formData.combo_content, onChange: handleChange, rows: 2, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "M\u00F4 t\u1EA3 ng\u1EAFn" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, rows: 3, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "N\u1ED9i dung chi ti\u1EBFt" }), _jsx("textarea", { name: "content", value: formData.content, onChange: handleChange, rows: 5, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "flex gap-2 pt-4", children: [_jsx("button", { type: "submit", disabled: loading, className: "bg-blue-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm", children: loading ? "Đang tạo..." : "Lưu Tour" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/tours"), className: "bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y" })] })] })] }));
}
