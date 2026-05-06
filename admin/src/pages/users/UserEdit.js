import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "user",
        phone: "",
        gender: "male",
        date_of_birth: "",
        passport_number: "",
        country_id: "",
        avatar_url: "",
    });
    const fetchUser = async () => {
        try {
            const data = await UserService.getUser(Number(id));
            setForm({
                name: data.name || "",
                email: data.email || "",
                role: data.role || "user",
                phone: data.phone || "",
                gender: data.gender || "male",
                date_of_birth: data.date_of_birth || "",
                passport_number: data.passport_number || "",
                country_id: data.country_id ? String(data.country_id) : "",
                avatar_url: data.avatar_url || "",
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    const fetchCountries = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/countries");
            const data = await res.json();
            setCountries(data);
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (id)
            fetchUser();
        fetchCountries();
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
            await UserService.updateUser(Number(id), {
                ...form,
                role: form.role,
                country_id: form.country_id ? Number(form.country_id) : undefined,
            });
            alert("Cập nhật thành công!");
            navigate("/admin/users");
        }
        catch (err) {
            console.error(err);
            alert("Cập nhật thất bại!");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Ch\u1EC9nh s\u1EEDa ng\u01B0\u1EDDi d\u00F9ng" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("input", { name: "name", value: form.name, onChange: handleChange, placeholder: "H\u1ECD v\u00E0 t\u00EAn", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "email", type: "email", value: form.email, onChange: handleChange, placeholder: "Email", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx("input", { name: "phone", value: form.phone, onChange: handleChange, placeholder: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { name: "passport_number", value: form.passport_number, onChange: handleChange, placeholder: "S\u1ED1 h\u1ED9 chi\u1EBFu (Passport)", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("select", { name: "gender", value: form.gender, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "male", children: "Nam" }), _jsx("option", { value: "female", children: "N\u1EEF" }), _jsx("option", { value: "other", children: "Kh\u00E1c" })] }), _jsxs("select", { name: "role", value: form.role, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "user", children: "Ng\u01B0\u1EDDi d\u00F9ng (User)" }), _jsx("option", { value: "admin", children: "Qu\u1EA3n tr\u1ECB vi\u00EAn (Admin)" })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-xs text-gray-500 ml-1", children: "Ng\u00E0y sinh" }), _jsx("input", { type: "date", name: "date_of_birth", value: form.date_of_birth, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" })] }), _jsxs("select", { name: "country_id", value: form.country_id, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "", children: "Ch\u1ECDn qu\u1ED1c gia" }), countries.map((country) => (_jsx("option", { value: country.id, children: country.name }, country.id)))] }), _jsx("input", { name: "avatar_url", value: form.avatar_url, onChange: handleChange, placeholder: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh \u0111\u1EA1i di\u1EC7n (URL)", className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "C\u1EADp nh\u1EADt" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/users"), className: "bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
