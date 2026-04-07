import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "../../components/table/DataTable";
import { Booking, getBookings } from "../../services/BookingService";
import { Link } from "react-router-dom";
import { ClipboardList, ExternalLink } from "lucide-react";

const columns: TableColumn<Booking>[] = [
  { key: "id", title: "ID" },
  { key: "user_id", title: "User ID" },
  { key: "booking_type", title: "Loại đặt", render: (row) => (
    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase bg-purple-100 text-purple-600">
      {row.booking_type}
    </span>
  )},
  { key: "target_id", title: "Mã đối tượng" },
  { key: "check_in", title: "Check In", render: (row) => row.check_in ? new Date(row.check_in).toLocaleDateString("vi-VN") : "—" },
  { key: "check_out", title: "Check Out", render: (row) => row.check_out ? new Date(row.check_out).toLocaleDateString("vi-VN") : "—" },
  { key: "created_at", title: "Ngày đặt", render: (row) => new Date(row.created_at).toLocaleDateString("vi-VN") },
  { key: "quantity", title: "SL" },
  { key: "total_amount", title: "Tổng tiền", render: (row) => (
    <span className="font-medium">{Number(row.total_amount || 0).toLocaleString("vi-VN")} VNĐ</span>
  )},
  { key: "status", title: "Trạng thái", render: (row) => (
    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
      row.status === "paid" ? "bg-blue-100 text-blue-600"
     : row.status === "confirmed" ? "bg-emerald-100 text-emerald-600"
     : row.status === "completed" ? "bg-cyan-100 text-cyan-600"
     : row.status === "cancelled" ? "bg-red-100 text-red-600"
     : "bg-amber-100 text-amber-600"
    }`}>
      {row.status}
    </span>
  )},
  {
    key: "actions",
    title: "Chi tiết",
    render: (row) => (
      <Link to={`/admin/bookings/${row.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex">
        <ExternalLink size={16} />
      </Link>
    ),
  },
];

const BookingList: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBookings()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
            <ClipboardList size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Quản lý Đặt chỗ</h1>
            <p className="text-xs text-gray-400">{data.length} đơn đặt</p>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
};

export default BookingList;
