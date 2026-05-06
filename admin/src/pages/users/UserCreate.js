import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
export default function UserCreate() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
        date_of_birth: "",
        country_id: "",
        avatar_url: "",
    });
    // load countries
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
        fetchCountries();
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
            await UserService.createUser({
                ...form,
                country_id: form.country_id ? Number(form.country_id) : undefined,
                role: form.role === "admin" ? "admin" : "user",
            });
            alert("Create success");
            navigate("/admin/users");
        }
        catch (err) {
            console.error(err);
            alert("Create failed");
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Create User" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsx("input", { name: "name", placeholder: "Name", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "email", placeholder: "Email", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsx("input", { name: "password", type: "password", placeholder: "Password", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", required: true }), _jsxs("select", { name: "role", value: form.role, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" })] }), _jsx("input", { name: "phone", placeholder: "Phone", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsx("input", { type: "date", name: "date_of_birth", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("select", { name: "country_id", value: form.country_id, onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all", children: [_jsx("option", { value: "", children: "Select Country" }), countries.map((country) => (_jsx("option", { value: country.id, children: country.name }, country.id)))] }), _jsx("input", { name: "avatar_url", placeholder: "Avatar URL", onChange: handleChange, className: "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20", children: "Create" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/users"), className: "bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors", children: "Cancel" })] })] })] }));
}
