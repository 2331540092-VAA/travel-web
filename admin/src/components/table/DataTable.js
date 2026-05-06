import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../styles/admin.css";
function DataTable({ columns, data, loading = false, emptyText = "Không có dữ liệu", }) {
    return (_jsx("div", { className: "admin-table-wrapper", children: _jsxs("table", { className: "admin-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map((col, index) => (_jsx("th", { children: col.title }, index))) }) }), _jsxs("tbody", { children: [loading && (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "text-center", children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u..." }) })), !loading && data.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: columns.length, className: "text-center", children: emptyText }) })), !loading &&
                            data.map((row, rowIndex) => (_jsx("tr", { children: columns.map((col, colIndex) => (_jsx("td", { children: col.render ? col.render(row) : row[col.key] }, colIndex))) }, rowIndex)))] })] }) }));
}
export default DataTable;
