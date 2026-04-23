import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  TrendingUp,
  ShoppingCart,
  CreditCard,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";
import ReportService from "../../services/ReportService";

interface ReportData {
  from: string;
  to: string;
  total_bookings: number;
  total_revenue: number;
  paid_revenue: number;
  by_type: Array<{ booking_type: string; count: number; revenue: number }>;
  by_status: Array<{ status: string; count: number }>;
  by_payment_method: Array<{ method: string; count: number; total: number }>;
  daily_revenue: Array<{ date: string; revenue: number; count: number }>;
}

const typeLabels: Record<string, string> = {
  tour: "Tour",
  hotel: "Khách sạn",
  restaurant: "Nhà hàng",
};

const typeColors: Record<string, string> = {
  tour: "bg-blue-500",
  hotel: "bg-amber-500",
  restaurant: "bg-emerald-500",
};

const statusLabels: Record<string, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
  paid: "Đã thanh toán",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  paid: "bg-purple-100 text-purple-700",
};

const Reports = () => {
  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split("T")[0];
  });
  const [to, setTo] = useState(() => new Date().toISOString().split("T")[0]);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await ReportService.getStats(from, to);
      setData(result);
    } catch (err) {
      console.error("Error loading report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExport = () => {
    window.open(ReportService.getExportUrl(from, to), "_blank");
  };

  const formatMoney = (v: number) =>
    v.toLocaleString("vi-VN") + "đ";

  const maxDailyRevenue = data?.daily_revenue?.length
    ? Math.max(...data.daily_revenue.map((d) => d.revenue))
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-blue-600" size={28} />
            Báo cáo doanh thu
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Thống kê và xuất báo cáo theo khoảng thời gian
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all"
        >
          <Download size={18} />
          Xuất PDF
        </button>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-end gap-4 flex-wrap">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Từ ngày
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Đến ngày
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
            />
          </div>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Đang tải..." : "Xem báo cáo"}
        </button>
      </div>

      {data && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ShoppingCart size={20} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Tổng đơn đặt</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {data.total_bookings.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} className="text-emerald-600" />
                </div>
                <span className="text-sm text-gray-500">Doanh thu</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {formatMoney(data.total_revenue)}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <CreditCard size={20} className="text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Đã thanh toán</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {formatMoney(data.paid_revenue)}
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-5">
            {/* By Type */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <PieChart size={18} className="text-blue-600" />
                Theo loại dịch vụ
              </h3>
              <div className="space-y-3">
                {data.by_type.map((item) => {
                  const pct =
                    data.total_revenue > 0
                      ? (item.revenue / data.total_revenue) * 100
                      : 0;
                  return (
                    <div key={item.booking_type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {typeLabels[item.booking_type] || item.booking_type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.count} đơn · {formatMoney(item.revenue)}
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            typeColors[item.booking_type] || "bg-gray-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {data.by_type.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Không có dữ liệu
                  </p>
                )}
              </div>
            </div>

            {/* By Status */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <BarChart3 size={18} className="text-blue-600" />
                Theo trạng thái
              </h3>
              <div className="space-y-2.5">
                {data.by_status.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50"
                  >
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        statusColors[item.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {statusLabels[item.status] || item.status}
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {item.count}
                    </span>
                  </div>
                ))}
                {data.by_status.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Không có dữ liệu
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          {data.by_payment_method.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <CreditCard size={18} className="text-blue-600" />
                Phương thức thanh toán
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {data.by_payment_method.map((item) => (
                  <div
                    key={item.method}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <p className="text-lg font-bold text-gray-800 uppercase">
                      {item.method}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.count} giao dịch
                    </p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">
                      {formatMoney(item.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Revenue Chart (simple bars) */}
          {data.daily_revenue.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-blue-600" />
                Doanh thu theo ngày
              </h3>
              <div className="flex items-end gap-1 h-40">
                {data.daily_revenue.map((d) => {
                  const pct =
                    maxDailyRevenue > 0
                      ? (d.revenue / maxDailyRevenue) * 100
                      : 0;
                  return (
                    <div
                      key={d.date}
                      className="flex-1 flex flex-col items-center group relative"
                    >
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm min-h-[2px] hover:from-blue-700 hover:to-blue-500 transition-colors"
                        style={{ height: `${Math.max(pct, 2)}%` }}
                      />
                      <div className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                        {new Date(d.date).toLocaleDateString("vi-VN")}:{" "}
                        {formatMoney(d.revenue)} ({d.count} đơn)
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                <span>
                  {new Date(data.daily_revenue[0].date).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
                <span>
                  {new Date(
                    data.daily_revenue[data.daily_revenue.length - 1].date
                  ).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reports;
