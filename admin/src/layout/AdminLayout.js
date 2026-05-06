import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
const AdminLayout = () => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-50 font-sans", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx(AdminHeader, {}), _jsx("main", { className: "flex-1 overflow-x-hidden overflow-y-auto p-6", children: _jsx(Outlet, {}) })] })] }));
};
export default AdminLayout;
