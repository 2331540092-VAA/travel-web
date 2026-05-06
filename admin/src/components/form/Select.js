import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Select = ({ label, error, options, ...props }) => {
    return (_jsxs("div", { className: "form-group", children: [label && _jsx("label", { className: "form-label", children: label }), _jsxs("select", { className: "form-select", ...props, children: [_jsx("option", { value: "", children: "-- Ch\u1ECDn --" }), options.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), error && _jsx("p", { className: "form-error", children: error })] }));
};
export default Select;
