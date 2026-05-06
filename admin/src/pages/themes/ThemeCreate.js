import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeService from "../../services/ThemeService";
const THEME_TYPES = [
    { value: "tet", label: "🧧 Tết Nguyên Đán" },
    { value: "christmas", label: "🎄 Giáng Sinh (Noel)" },
    { value: "halloween", label: "🎃 Halloween" },
    { value: "valentine", label: "❤️ Valentine" },
    { value: "mid_autumn", label: "🏮 Trung Thu" },
];
const COLOR_PRESETS = {
    tet: { primary: "#dc2626", secondary: "#f59e0b", accent: "#fbbf24" },
    christmas: { primary: "#16a34a", secondary: "#dc2626", accent: "#fbbf24" },
    halloween: { primary: "#ea580c", secondary: "#7c3aed", accent: "#facc15" },
    valentine: { primary: "#e11d48", secondary: "#ec4899", accent: "#fb7185" },
    mid_autumn: { primary: "#d97706", secondary: "#dc2626", accent: "#fbbf24" },
};
export default function ThemeCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        type: "tet",
        banner_url: "",
        logo_url: "",
        primary_color: "#dc2626",
        secondary_color: "#f59e0b",
        accent_color: "#fbbf24",
        description: "",
        start_date: "",
        end_date: "",
        is_active: false,
    });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        // Auto-fill colors when type changes
        if (target.name === "type" && COLOR_PRESETS[target.value]) {
            const preset = COLOR_PRESETS[target.value];
            setFormData({
                ...formData,
                type: target.value,
                primary_color: preset.primary,
                secondary_color: preset.secondary,
                accent_color: preset.accent,
            });
            return;
        }
        setFormData({ ...formData, [target.name]: value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...formData,
            banner_url: formData.banner_url || null,
            logo_url: formData.logo_url || null,
            description: formData.description || null,
            start_date: formData.start_date || null,
            end_date: formData.end_date || null,
        };
        try {
            await ThemeService.createTheme(payload);
            alert("Theme đã được tạo thành công!");
            navigate("/admin/themes");
        }
        catch (error) {
            console.error("Create theme failed:", error);
            alert("Tạo theme thất bại");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "p-6 max-w-2xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm Theme m\u1EDBi" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "T\u00EAn theme" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, required: true, placeholder: "VD: Xu\u00E2n \u1EA4t T\u1EF5 2025", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Lo\u1EA1i ch\u1EE7 \u0111\u1EC1" }), _jsx("select", { name: "type", value: formData.type, onChange: handleChange, required: true, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: THEME_TYPES.map((t) => (_jsx("option", { value: t.value, children: t.label }, t.value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Banner URL" }), _jsx("input", { type: "text", name: "banner_url", value: formData.banner_url, onChange: handleChange, placeholder: "https://...", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Logo URL" }), _jsx("input", { type: "text", name: "logo_url", value: formData.logo_url, onChange: handleChange, placeholder: "https://...", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "M\u00E0u ch\u00EDnh" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "color", name: "primary_color", value: formData.primary_color, onChange: handleChange, className: "w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" }), _jsx("input", { type: "text", value: formData.primary_color, onChange: (e) => setFormData({ ...formData, primary_color: e.target.value }), className: "flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "M\u00E0u ph\u1EE5" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "color", name: "secondary_color", value: formData.secondary_color, onChange: handleChange, className: "w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" }), _jsx("input", { type: "text", value: formData.secondary_color, onChange: (e) => setFormData({ ...formData, secondary_color: e.target.value }), className: "flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "M\u00E0u nh\u1EA5n" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "color", name: "accent_color", value: formData.accent_color, onChange: handleChange, className: "w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" }), _jsx("input", { type: "text", value: formData.accent_color, onChange: (e) => setFormData({ ...formData, accent_color: e.target.value }), className: "flex-1 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-sm" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "M\u00F4 t\u1EA3" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, rows: 3, placeholder: "M\u00F4 t\u1EA3 ng\u1EAFn v\u1EC1 theme...", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Ng\u00E0y b\u1EAFt \u0111\u1EA7u" }), _jsx("input", { type: "date", name: "start_date", value: formData.start_date, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Ng\u00E0y k\u1EBFt th\u00FAc" }), _jsx("input", { type: "date", name: "end_date", value: formData.end_date, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", name: "is_active", checked: formData.is_active, onChange: handleChange, className: "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" }), _jsx("label", { className: "text-sm font-semibold text-gray-700", children: "\u00C1p d\u1EE5ng ngay (t\u1EAFt theme kh\u00E1c \u0111ang b\u1EADt)" })] }), formData.banner_url && (_jsxs("div", { children: [_jsx("label", { className: "block mb-1.5 text-sm font-semibold text-gray-700", children: "Xem tr\u01B0\u1EDBc Banner" }), _jsx("img", { src: formData.banner_url, alt: "Preview", className: "w-full h-40 object-cover rounded-xl border border-gray-200", onError: (e) => (e.currentTarget.style.display = "none") })] })), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "submit", disabled: loading, className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: loading ? "Đang tạo..." : "Tạo Theme" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/themes"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y" })] })] })] }));
}
