import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Input = ({ label, error, ...props }) => {
    return (_jsxs("div", { className: "form-group", children: [label && _jsx("label", { className: "form-label", children: label }), _jsx("input", { className: "form-input", ...props }), error && _jsx("p", { className: "form-error", children: error })] }));
};
export default Input;
