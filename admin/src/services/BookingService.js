const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/bookings`;
export const getBookings = async () => {
    const res = await fetch(API_URL);
    if (!res.ok)
        throw new Error("Lỗi khi lấy danh sách booking");
    return res.json();
};
export const getBookingById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok)
        throw new Error("Lỗi khi lấy chi tiết booking");
    return res.json();
};
export const updateBookingStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });
    if (!res.ok)
        throw new Error("Lỗi khi cập nhật trạng thái booking");
    return res.json();
};
export const deleteBooking = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok)
        throw new Error("Lỗi khi xóa booking");
    return res.json();
};
