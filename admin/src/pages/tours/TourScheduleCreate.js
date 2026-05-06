import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TourService from "../../services/TourService";
export default function TourScheduleCreate() {
    const { id } = useParams(); // tour id
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        day_number: "",
        time: "",
        title: "",
        activity: "",
    });
    const [loading, setLoading] = useState(false);
    const [tourName, setTourName] = useState("");
    // Khai báo các class đồng bộ để code sạch hơn
    const labelClass = "block mb-1.5 text-sm font-semibold text-gray-700";
    const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
    useEffect(() => {
        if (id)
            fetchTourName();
    }, [id]);
    async function fetchTourName() {
        try {
            const tour = await TourService.getTour(Number(id));
            setTourName(tour.name || "");
        }
        catch (error) {
            setTourName("");
        }
    }
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!id)
            return;
        setLoading(true);
        try {
            await TourService.createSchedule({
                tour_id: Number(id),
                day_number: Number(formData.day_number),
                time: formData.time,
                title: formData.title,
                activity: formData.activity,
            });
            alert("Thêm lịch trình thành công!");
            navigate(`/admin/tours/${id}/schedules`);
        }
        catch (error) {
            alert("Không thể tạo lịch trình. Vui lòng kiểm tra lại.");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "p-6 max-w-3xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Th\u00EAm L\u1ECBch tr\u00ECnh M\u1EDBi" }), _jsxs("p", { className: "text-blue-600 font-medium italic text-sm", children: ["Tour: ", tourName] })] }), _jsx("button", { onClick: () => navigate(`/admin/tours/${id}/schedules`), className: "text-sm text-blue-600 hover:underline", children: "\u2190 Quay l\u1EA1i" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ng\u00E0y th\u1EE9 m\u1EA5y?" }), _jsx("input", { type: "number", name: "day_number", value: formData.day_number, onChange: handleChange, required: true, className: inputClass, placeholder: "VD: 1" })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Th\u1EDDi gian (Gi\u1EDD ho\u1EB7c Bu\u1ED5i)" }), _jsx("input", { type: "text", name: "time", list: "time-suggestions", value: formData.time, onChange: handleChange, className: inputClass, placeholder: "Nh\u1EADp gi\u1EDD (08:00) ho\u1EB7c ch\u1EEF (S\u00E1ng)..." }), _jsxs("datalist", { id: "time-suggestions", children: [_jsx("option", { value: "S\u00E1ng" }), _jsx("option", { value: "Tr\u01B0a" }), _jsx("option", { value: "Chi\u1EC1u" }), _jsx("option", { value: "T\u1ED1i" }), _jsx("option", { value: "C\u1EA3 ng\u00E0y" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Ti\u00EAu \u0111\u1EC1 ho\u1EA1t \u0111\u1ED9ng / \u0110\u1ECBa \u0111i\u1EC3m" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, required: true, className: inputClass, placeholder: "VD: \u0102n s\u00E1ng t\u1EA1i kh\u00E1ch s\u1EA1n / Tham quan Ph\u1ED1 C\u1ED5" })] }), _jsxs("div", { children: [_jsx("label", { className: labelClass, children: "Chi ti\u1EBFt ho\u1EA1t \u0111\u1ED9ng" }), _jsx("textarea", { name: "activity", value: formData.activity, onChange: handleChange, rows: 6, className: inputClass, placeholder: "M\u00F4 t\u1EA3 chi ti\u1EBFt c\u00E1c ho\u1EA1t \u0111\u1ED9ng di\u1EC5n ra..." })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm disabled:bg-blue-300", children: loading ? "Đang lưu..." : "Lưu Lịch trình" }), _jsx("button", { type: "button", onClick: () => navigate(`/admin/tours/${id}/schedules`), className: "flex-1 bg-gray-100 text-gray-600 px-5 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all", children: "H\u1EE7y b\u1ECF" })] })] })] }));
}
