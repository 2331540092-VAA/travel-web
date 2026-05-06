import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
export default function RestaurantEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({
        location_id: "",
        name: "",
        min_price: "",
        max_price: "",
        discount_percent: "0", // Chuyển về string để đồng bộ với input text
        promotion_end: "",
        description: "",
        menu_content: "",
        amenities: "",
        image_url: "",
        address: "",
        lat: "",
        lng: "",
    });
    useEffect(() => {
        const initData = async () => {
            await loadLocations();
            await loadRestaurant();
        };
        initData();
    }, [id]);
    const loadRestaurant = async () => {
        try {
            const restaurantId = id ? Number(id) : undefined;
            if (!restaurantId || isNaN(restaurantId))
                return;
            const data = await RestaurantService.getRestaurant(restaurantId);
            let menuString = "";
            if (data.menu && Array.isArray(data.menu)) {
                menuString = data.menu
                    .map((item) => `${item.name} - ${Math.floor(item.price)}`) // Làm tròn giá món ăn
                    .join("\n");
            }
            setForm({
                location_id: data.location_id || "",
                name: data.name || "",
                // Làm sạch số nguyên khi load từ DB lên
                min_price: data.min_price ? Math.floor(data.min_price).toString() : "",
                max_price: data.max_price ? Math.floor(data.max_price).toString() : "",
                discount_percent: data.discount_percent
                    ? Math.floor(data.discount_percent).toString()
                    : "0",
                promotion_end: data.promotion_end
                    ? data.promotion_end.split("T")[0]
                    : "",
                description: data.description || "",
                menu_content: menuString,
                amenities: Array.isArray(data.amenities)
                    ? data.amenities.join(", ")
                    : data.amenities || "",
                image_url: data.image_url || "",
                address: data.address || "",
                lat: data.lat || "",
                lng: data.lng || "",
            });
        }
        catch (error) {
            console.error("Lỗi khi tải thông tin nhà hàng:", error);
            alert("Không thể tải thông tin nhà hàng");
        }
        finally {
            setLoading(false);
        }
    };
    const loadLocations = async () => {
        try {
            const data = await RestaurantService.getLocations();
            setLocations(data);
        }
        catch (error) {
            console.error("Lỗi khi tải danh sách địa điểm:", error);
        }
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Xử lý chặn số lẻ ngay khi gõ cho các trường giá và giảm giá
        if (["min_price", "max_price", "discount_percent"].includes(name)) {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm((prev) => ({ ...prev, [name]: onlyNumbers }));
            return;
        }
        let val = value;
        if (type === "checkbox")
            val = checked;
        setForm((prev) => ({ ...prev, [name]: val }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const restaurantId = id ? Number(id) : undefined;
            if (!restaurantId || isNaN(restaurantId))
                throw new Error("ID không hợp lệ");
            const menuArray = form.menu_content
                ? form.menu_content
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line) => {
                    const [name, price] = line.split("-");
                    return {
                        name: name ? name.trim() : "Món chưa đặt tên",
                        price: price
                            ? Math.round(Number(price.trim().replace(/[^0-9]/g, "")))
                            : 0,
                    };
                })
                : [];
            const payload = {
                ...form,
                location_id: form.location_id ? Number(form.location_id) : null,
                min_price: form.min_price ? Number(form.min_price) : null,
                max_price: form.max_price ? Number(form.max_price) : null,
                discount_percent: Number(form.discount_percent),
                lat: form.lat ? Number(form.lat) : null,
                lng: form.lng ? Number(form.lng) : null,
                menu: menuArray,
                amenities: form.amenities
                    ? form.amenities.split(",").map((i) => i.trim())
                    : [],
                is_promotion: Number(form.discount_percent) > 0 || !!form.promotion_end,
            };
            await RestaurantService.updateRestaurant(restaurantId, payload);
            alert("Cập nhật nhà hàng thành công!");
            navigate("/admin/restaurants");
        }
        catch (error) {
            console.error("Lỗi khi cập nhật nhà hàng:", error);
            alert("Cập nhật thất bại!");
        }
    };
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    const labelClass = "block mb-1.5 text-sm font-semibold text-gray-700";
    if (loading)
        return (_jsx("div", { className: "flex items-center justify-center min-h-96 text-gray-500", children: "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u nh\u00E0 h\u00E0ng..." }));
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Ch\u1EC9nh s\u1EEDa Nh\u00E0 h\u00E0ng" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "T\u00EAn nh\u00E0 h\u00E0ng" }), _jsx("input", { name: "name", value: form.name, onChange: handleChange, required: true, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Khu v\u1EF1c/\u0110\u1ECBa \u0111i\u1EC3m" }), _jsxs("select", { name: "location_id", value: form.location_id, onChange: handleChange, className: inputClass, required: true, children: [_jsx("option", { value: "", children: "Ch\u1ECDn \u0111\u1ECBa \u0111i\u1EC3m" }), locations.map((loc) => (_jsx("option", { value: loc.id, children: loc.name }, loc.id)))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 th\u1EA5p nh\u1EA5t (VN\u0110)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "min_price", value: form.min_price, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u00E1 cao nh\u1EA5t (VN\u0110)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "max_price", value: form.max_price, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Gi\u1EA3m gi\u00E1 (%)" }), _jsx("input", { type: "text", inputMode: "numeric", name: "discount_percent", value: form.discount_percent, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ng\u00E0y k\u1EBFt th\u00FAc khuy\u1EBFn m\u00E3i" }), _jsx("input", { type: "date", name: "promotion_end", value: form.promotion_end, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u01B0\u1EDDng d\u1EABn \u1EA3nh (URL)" }), _jsx("input", { name: "image_url", value: form.image_url, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "\u0110\u1ECBa ch\u1EC9 chi ti\u1EBFt" }), _jsx("input", { name: "address", value: form.address, onChange: handleChange, className: inputClass })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "V\u0129 \u0111\u1ED9 (Latitude)" }), _jsx("input", { type: "number", step: "any", name: "lat", value: form.lat, onChange: handleChange, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Kinh \u0111\u1ED9 (Longitude)" }), _jsx("input", { type: "number", step: "any", name: "lng", value: form.lng, onChange: handleChange, className: inputClass })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "M\u00F4 t\u1EA3 nh\u00E0 h\u00E0ng" }), _jsx("textarea", { name: "description", value: form.description, onChange: handleChange, rows: 3, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "N\u1ED9i dung th\u1EF1c \u0111\u01A1n (T\u00EAn m\u00F3n - Gi\u00E1 ti\u1EC1n)" }), _jsx("textarea", { name: "menu_content", placeholder: "VD:\nT\u00F4m h\u00F9m - 750000", value: form.menu_content, onChange: handleChange, rows: 5, className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ti\u1EC7n \u00EDch (c\u00E1ch nhau b\u1EB1ng d\u1EA5u ph\u1EA9y)" }), _jsx("input", { name: "amenities", value: form.amenities, onChange: handleChange, placeholder: "Wifi, M\u00E1y l\u1EA1nh...", className: inputClass })] }), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-gray-50", children: [_jsx("button", { type: "submit", className: "bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200", children: "L\u01B0u thay \u0111\u1ED5i" }), _jsx("button", { type: "button", onClick: () => navigate("/admin/restaurants"), className: "bg-white text-gray-600 border border-gray-200 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
