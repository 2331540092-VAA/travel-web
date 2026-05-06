import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { Users, Plus, Pencil, Trash2 } from "lucide-react";
export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const fetchUsers = async () => {
        try {
            const data = await UserService.getUsers();
            setUsers(data.data || data);
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        if (!id)
            return;
        if (!confirm("Xóa người dùng này?"))
            return;
        try {
            await UserService.deleteUser(id);
            fetchUsers();
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600", children: _jsx(Users, { size: 22 }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-800", children: "Qu\u1EA3n l\u00FD Ng\u01B0\u1EDDi d\u00F9ng" }), _jsxs("p", { className: "text-xs text-gray-400", children: [users.length, " ng\u01B0\u1EDDi d\u00F9ng"] })] })] }), _jsxs("button", { onClick: () => navigate("/admin/users/create"), className: "flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm", children: [_jsx(Plus, { size: 16 }), " Th\u00EAm m\u1EDBi"] })] }), _jsx("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400", children: [_jsx("th", { className: "px-5 py-3.5 text-left", children: "ID" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "T\u00EAn" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Email" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "S\u0110T" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Ng\u00E0y sinh" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Qu\u1ED1c gia" }), _jsx("th", { className: "px-5 py-3.5 text-left", children: "Vai tr\u00F2" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "Avatar" }), _jsx("th", { className: "px-5 py-3.5 text-center", children: "H\u00E0nh \u0111\u1ED9ng" })] }) }), _jsxs("tbody", { className: "divide-y divide-gray-50", children: [users.map((user) => (_jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [_jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: user.id }), _jsx("td", { className: "px-5 py-4 text-sm font-semibold text-gray-800", children: user.name }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-600", children: user.email }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: user.phone || "—" }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: user.date_of_birth
                                                    ? new Date(user.date_of_birth).toLocaleDateString("vi-VN")
                                                    : "—" }), _jsx("td", { className: "px-5 py-4 text-sm text-gray-500", children: user.country?.name || "—" }), _jsx("td", { className: "px-5 py-4", children: _jsx("span", { className: `text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${user.role === "admin"
                                                        ? "bg-violet-100 text-violet-600"
                                                        : "bg-sky-100 text-sky-600"}`, children: user.role }) }), _jsx("td", { className: "px-5 py-4 text-center", children: user.avatar_url ? (_jsx("img", { src: `http://127.0.0.1:8000/storage/${user.avatar_url}`, className: "w-9 h-9 rounded-full object-cover mx-auto ring-2 ring-gray-100" })) : (_jsx("div", { className: "w-9 h-9 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-gray-400 text-xs font-bold", children: user.name?.charAt(0) })) }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-2", children: [_jsx("button", { onClick: () => navigate(`/admin/users/edit/${user.id}`), className: "p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors", title: "S\u1EEDa", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(user.id), className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors", title: "X\u00F3a", children: _jsx(Trash2, { size: 16 }) })] }) })] }, user.id))), users.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 9, className: "px-5 py-12 text-center text-gray-400 text-sm", children: "Ch\u01B0a c\u00F3 ng\u01B0\u1EDDi d\u00F9ng n\u00E0o." }) }))] })] }) }) })] }));
}
