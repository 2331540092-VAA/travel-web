import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/admin.css";
const ConfirmModal = ({ open, title = "Xác nhận", message = "Bạn có chắc chắn muốn thực hiện hành động này?", confirmText = "Xác nhận", cancelText = "Hủy", loading = false, onConfirm, onCancel, }) => {
    if (!open)
        return null;
    return (_jsx("div", { className: "admin-modal-overlay", children: _jsxs("div", { className: "admin-modal", children: [_jsx("div", { className: "admin-modal-header", children: _jsx("h3", { children: title }) }), _jsx("div", { className: "admin-modal-body", children: _jsx("p", { children: message }) }), _jsxs("div", { className: "admin-modal-footer", children: [_jsx("button", { className: "btn btn-cancel", onClick: onCancel, disabled: loading, children: cancelText }), _jsx("button", { className: "btn btn-danger", onClick: onConfirm, disabled: loading, children: loading ? "Đang xử lý..." : confirmText })] })] }) }));
};
export default ConfirmModal;
