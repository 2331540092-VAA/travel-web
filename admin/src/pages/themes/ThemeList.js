import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeService from "../../services/ThemeService";
import { Palette, Plus, Pencil, Trash2, Power } from "lucide-react";
const THEME_TYPE_LABELS = {
    tet: { label: "🧧 Tết Nguyên Đán", color: "bg-red-100 text-red-600" },
    christmas: { label: "🎄 Giáng Sinh", color: "bg-green-100 text-green-600" },
    halloween: { label: "🎃 Halloween", color: "bg-orange-100 text-orange-600" },
    valentine: { label: "❤️ Valentine", color: "bg-pink-100 text-pink-600" },
    mid_autumn: { label: "🏮 Trung Thu", color: "bg-yellow-100 text-yellow-700" },
};
export default function ThemeList() {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        fetchThemes();
    }, []);
    async function fetchThemes() {
        try {
            const data = await ThemeService.getThemes();
            setThemes(data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleDelete(id) {
        if (!confirm("Xóa theme này?"))
            return;
        try {
            await ThemeService.deleteTheme(id);
            setThemes(themes.filter((t) => t.id !== id));
        }
        catch (error) {
            console.error(error);
        }
    }
    async function handleToggleActive(id) {
        try {
            await ThemeService.toggleActive(id);
            await fetchThemes();
        }
        catch (error) {
            console.error(error);
        }
    }
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentThemes = themes.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(themes.length / itemsPerPage);
    if (loading)
        return (_jsxs("div", { className: "flex items-center justify-center py-20 text-gray-400", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3" }), "\u0110ang t\u1EA3i..."] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600", children: _jsx(Palette, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Theme" }), _jsxs("p", { className: "text-xs text-gray-400", children: [themes.length, " ch\u1EE7 \u0111\u1EC1"] })] })] }), _jsxs(Link, { to: "/admin/themes/create", className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm no-underline", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Banner" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "T\u00EAn theme" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Lo\u1EA1i" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "M\u00E0u" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Th\u1EDDi gian" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Tr\u1EA1ng th\u00E1i" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [currentThemes.map((theme) => {
                                        const typeInfo = THEME_TYPE_LABELS[theme.type] || {
                                            label: theme.type,
                                            color: "bg-gray-100 text-gray-600",
                                        };
                                        return (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: theme.id }), _jsx("td", { className: "px-5 py-4", children: theme.banner_url ? (_jsx("img", { src: theme.banner_url, alt: theme.name, className: "w-20 h-14 object-cover rounded-lg" })) : (_jsx("div", { className: "w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs", children: "No img" })) }), _jsxs("td", { className: "px-5 py-4", children: [_jsx("div", { className: "text-sm font-semibold text-gray-800", children: theme.name }), theme.description && (_jsx("div", { className: "text-xs text-gray-400 mt-0.5 truncate max-w-[200px]", children: theme.description }))] }), _jsx("td", { className: "px-5 py-4", children: _jsx("span", { className: `text-[10px] px-2.5 py-1 rounded-full font-bold ${typeInfo.color}`, children: typeInfo.label }) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1", children: [theme.primary_color && (_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-white shadow-sm", style: { backgroundColor: theme.primary_color }, title: `Primary: ${theme.primary_color}` })), theme.secondary_color && (_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-white shadow-sm", style: { backgroundColor: theme.secondary_color }, title: `Secondary: ${theme.secondary_color}` })), theme.accent_color && (_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-white shadow-sm", style: { backgroundColor: theme.accent_color }, title: `Accent: ${theme.accent_color}` }))] }) }), _jsx("td", { className: "px-5 py-4 text-center text-xs text-gray-500", children: theme.start_date && theme.end_date ? (_jsxs(_Fragment, { children: [new Date(theme.start_date).toLocaleDateString("vi-VN"), " ", _jsx("br", {}), " \u2192 ", new Date(theme.end_date).toLocaleDateString("vi-VN")] })) : (_jsx("span", { className: "text-gray-300", children: "\u2014" })) }), _jsx("td", { className: "px-5 py-4 text-center", children: theme.is_active ? (_jsx("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-600", children: "\u0110ang \u00E1p d\u1EE5ng" })) : (_jsx("span", { className: "text-[10px] px-2.5 py-1 rounded-full font-bold bg-gray-100 text-gray-400", children: "T\u1EAFt" })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-1.5", children: [_jsx("button", { onClick: () => handleToggleActive(theme.id), className: `p-2 rounded-lg transition-colors ${theme.is_active
                                                                    ? "text-emerald-600 hover:bg-emerald-50"
                                                                    : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"}`, title: theme.is_active ? "Tắt theme" : "Bật theme", children: _jsx(Power, { size: 16 }) }), _jsx(Link, { to: `/admin/themes/edit/${theme.id}`, className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(theme.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx(Trash2, { size: 16 }) })] }) })] }, theme.id));
                                    }), themes.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Ch\u01B0a c\u00F3 theme n\u00E0o." }) }))] })] }) }) }), totalPages > 1 && (_jsx("div", { className: "flex justify-center gap-2", children: Array.from({ length: totalPages }, (_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`, children: i + 1 }, i))) }))] }));
}
