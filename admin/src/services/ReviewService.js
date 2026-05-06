const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/reviews`;
/**
 * Lấy danh sách đánh giá
 * @param type: Truyền vào reviewable_type (VD: App\Models\Tour) để lọc
 */
export const getReviews = async (type) => {
    // Sử dụng URLSearchParams để build query string chuẩn hơn
    const url = new URL(API_URL);
    if (type)
        url.searchParams.append("reviewable_type", type);
    const res = await fetch(url.toString());
    if (!res.ok)
        throw new Error("Không thể kết nối máy chủ để lấy danh sách đánh giá");
    return res.json();
};
/**
 * Duyệt đánh giá (Chuyển is_approved thành true)
 */
export const approveReview = async (id) => {
    const res = await fetch(`${API_URL}/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok)
        throw new Error("Cập nhật duyệt đánh giá thất bại");
    return res.json();
};
/**
 * Từ chối/Bỏ duyệt đánh giá (Chuyển is_approved thành false)
 */
export const rejectReview = async (id) => {
    const res = await fetch(`${API_URL}/${id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok)
        throw new Error("Hủy trạng thái duyệt thất bại");
    return res.json();
};
/**
 * Xóa vĩnh viễn đánh giá
 */
export const deleteReview = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok)
        throw new Error("Xóa đánh giá thất bại");
    return res.json();
};
