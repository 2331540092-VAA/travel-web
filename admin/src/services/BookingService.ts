const API_URL = `${import.meta.env.VITE_API_BASE}/api/admin/bookings`;

export interface Booking {
  id: number;
  user_id: number;
  booking_type: string;
  target_id: number;
  item_id?: number;
  check_in?: string;
  check_out?: string;
  booking_date: string;
  quantity: number;
  total_amount: number;
  payment_type: string;
  status: string;
  note?: string;
  user?: any;
  created_at?: string;
  tour?: { id: number; name: string };
  hotel?: { id: number; name: string };
  restaurant?: { id: number; name: string };
  hotel_room?: { id: number; name: string };
  restaurant_table?: { id: number; name: string };
}

export const getBookings = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách booking");
  return res.json();
};

export const getBookingById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Lỗi khi lấy chi tiết booking");
  return res.json();
};

export const updateBookingStatus = async (id: number, status: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật trạng thái booking");
  return res.json();
};

export const deleteBooking = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Lỗi khi xóa booking");
  return res.json();
};



