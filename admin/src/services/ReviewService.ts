const API_URL = "http://localhost:8000/api/admin/reviews";

export interface Review {
  id: number;
  user_id: number;
  reviewable_type: string;
  reviewable_id: number;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
  user?: { id: number; name: string; avatar_url: string | null };
  entity_name?: string;
  entity_type?: string;
}

export const getReviews = async (type?: string): Promise<Review[]> => {
  const url = type ? `${API_URL}?type=${type}` : API_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách review");
  return res.json();
};

export const approveReview = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}/approve`, { method: "PATCH" });
  if (!res.ok) throw new Error("Lỗi khi duyệt review");
  return res.json();
};

export const rejectReview = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}/reject`, { method: "PATCH" });
  if (!res.ok) throw new Error("Lỗi khi từ chối review");
  return res.json();
};

export const deleteReview = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Lỗi khi xóa review");
  return res.json();
};
