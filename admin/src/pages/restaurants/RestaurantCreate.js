import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
export default function RestaurantCreate() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({
        location_id: "",
        name: "",
        min_price: "",
        max_price: "",
        discount_percent: 0,
        promotion_end: "",
        description: "",
        menu_content: "", // Nhập liệu dạng: Tên món - Giá
        amenities: "",
        image_url: "",
        address: "",
        lat: "",
        lng: "",
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data))
            .catch((err) => console.error("Lỗi khi tải danh sách địa điểm:", err));
    }, []);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val = value;
        if (type === "number")
            val = value === "" ? "" : Number(value);
        if (type === "checkbox")
            val = checked;
        setForm({
            ...form,
            [name]: val,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // LOGIC QUAN TRỌNG: Chuyển đổi văn bản thành mảng Object [{name, price}]
            const menuArray = form.menu_content
                ? form.menu_content
                    .split("\n") // Tách từng dòng
                    .filter((line) => line.trim() !== "") // Loại bỏ dòng trống
                    .map((line) => {
                    const [name, price] = line.split("-"); // Tách tên và giá bằng dấu "-"
                    return {
                        name: name ? name.trim() : "Món chưa đặt tên",
                        price: price ? Number(price.trim().replace(/[^0-9]/g, "")) : 0, // Chỉ lấy số
                    };
                })
                : [];
            const payload = {
                ...form,
                location_id: form.location_id ? Number(form.location_id) : null,
                min_price: form.min_price ? Number(form.min_price) : null,
                max_price: form.max_price ? Number(form.max_price) : null,
                lat: form.lat ? Number(form.lat) : null,
                lng: form.lng ? Number(form.lng) : null,
                // Gửi thực đơn đã cấu trúc lại
                menu: menuArray,
                amenities: form.amenities
                    ? form.amenities.split(",").map((i) => i.trim())
                    : [],
                is_promotion: form.discount_percent > 0 || !!form.promotion_end,
            };
            await RestaurantService.createRestaurant(payload);
            alert("Thêm nhà hàng thành công!");
            navigate("/admin/restaurants");
        }
        catch (error) {
            console.error("Lỗi khi tạo nhà hàng:", error);
            alert("Thêm nhà hàng thất bại!");
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block mb-1.5 text-sm font-semibold text-gray-700";
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm Nh\u00E0 H\u00E0ng M\u1EDBi" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u00EAn nh\u00E0 h\u00E0ng" }), _jsx("input", { name: "name", placeholder: "Nh\u1EADp t\u00EAn nh\u00E0 h\u00E0ng...", value: form.name, onChange: handleChange, required: true, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Khu v\u1EF1c/\u0110\u1ECBa \u0111i\u1EC3m" }), _jsxs("select", { name: "location_id", value: form.location_id, onChange: handleChange, className: inputClass, required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn \u0111\u1ECBa \u0111i\u1EC3m" }), locations.map((loc) => (_jsx("option", { value: loc.id, children: loc.name }, loc.id)))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 th\u1EA5p nh\u1EA5t (VN\u0110)" }), _jsx("input", { type: "number", name: "min_price", placeholder: "VD: 50000", value: form.min_price, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 cao nh\u1EA5t (VN\u0110)" }), _jsx("input", { type: "number", name: "max_price", placeholder: "VD: 500000", value: form.max_price, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { type: "number", name: "discount_percent", value: form.discount_percent, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ng\u00E0y k\u1EBFt th\u00FAc khuy\u1EBFn m\u00E3i" }), _jsx("input", { type: "date", name: "promotion_end", value: form.promotion_end, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh (URL)" }), _jsx("input", { name: "image_url", placeholder: "https://example.com/image.jpg", value: form.image_url, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u1ECBa ch\u1EC9 chi ti\u1EBFt" }), _jsx("input", { name: "address", placeholder: "S\u1ED1 nh\u00E0, t\u00EAn \u0111\u01B0\u1EDDng, qu\u1EADn/huy\u1EC7n...", value: form.address, onChange: handleChange, className: inputClass })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "V\u0129 \u0111\u1ED9 (Latitude)" }), _jsx("input", { type: "number", step: "any", name: "lat", placeholder: "VD: 10.762622", value: form.lat, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Kinh \u0111\u1ED9 (Longitude)" }), _jsx("input", { type: "number", step: "any", name: "lng", placeholder: "VD: 106.660172", value: form.lng, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "M\u00F4 t\u1EA3 nh\u00E0 h\u00E0ng" }), _jsx("textarea", { name: "description", placeholder: "Gi\u1EDBi thi\u1EC7u s\u01A1 l\u01B0\u1EE3c v\u1EC1 nh\u00E0 h\u00E0ng...", value: form.description, onChange: handleChange, rows: 3, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "N\u1ED9i dung th\u1EF1c \u0111\u01A1n (\u0110\u1ECBnh d\u1EA1ng: T\u00EAn m\u00F3n - Gi\u00E1 ti\u1EC1n)" }), _jsx("textarea", { name: "menu_content", placeholder: "VD:\nT\u00F4m h\u00F9m xanh h\u1EA5p - 750000\nGh\u1EB9 xanh lo\u1EA1i 1 - 450000", value: form.menu_content, onChange: handleChange, rows: 5, className: inputClass }), _jsx("p", { className: "mt-1.5 text-xs text-gray-500 italic", children: "* M\u1ED7i m\u00F3n nh\u1EADp 1 d\u00F2ng theo \u0111\u00FAng c\u1EA5u tr\u00FAc: T\u00EAn m\u00F3n - Gi\u00E1 ti\u1EC1n" })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ti\u1EC7n \u00EDch (c\u00E1ch nhau b\u1EB1ng d\u1EA5u ph\u1EA9y)" }), _jsx("input", { name: "amenities", placeholder: "Wifi, Ch\u1ED7 \u0111\u1EADu xe, M\u00E1y l\u1EA1nh...", value: form.amenities, onChange: handleChange, className: inputClass })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200", children: "T\u1EA1o Nh\u00E0 H\u00E0ng" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/restaurants"), className: "bg-white text-gray-600 border border-gray-200 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
