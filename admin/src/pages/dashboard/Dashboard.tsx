import { useEffect, useState } from "react";
import {
  Users,
  MapPin,
  Hotel,
  Map,
  ArrowUpRight,
  Loader2,
  BarChart3,
  Utensils,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardService from "../../services/DashboardService";
import ReportService from "../../services/ReportService";

interface StatItem {
  label: string;
  value: number;
  icon: string;
  trend: string;
}

interface DailyRevenue {
  date: string;
  revenue: number;
  count: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [revenue, setRevenue] = useState("0 VNĐ");
  const [loading, setLoading] = useState(true);
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await DashboardService.getStats();
        setStats(data.stats || []);
        setRevenue(data.revenue || "0 VNĐ");
        setRecentBookings(data.recent_bookings || []);

        // Lấy doanh thu 30 ngày gần nhất
        const to = new Date().toISOString().split("T")[0];
        const from = new Date(Date.now() - 29 * 86400000).toISOString().split("T")[0];
        setDateRange({ from, to });
        const report = await ReportService.getStats(from, to);
        setDailyRevenue(report.daily_revenue || []);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getIconDetails = (iconName: string) => {
    switch (iconName) {
      case "MapPin":
        return { Icon: MapPin, color: "bg-blue-500" };
      case "Hotel":
        return { Icon: Hotel, color: "bg-emerald-500" };
      case "Utensils":
        return { Icon: Utensils, color: "bg-rose-500" };
      case "Map":
        return { Icon: Map, color: "bg-orange-500" };
      case "Users":
        return { Icon: Users, color: "bg-purple-500" };
      default:
        return { Icon: BarChart3, color: "bg-gray-500" };
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3 py-32">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="font-medium animate-pulse">
          Đang tải dữ liệu thống kê...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Chào buổi sáng, Admin! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Đây là những gì đang diễn ra với hệ thống của bạn hôm nay.
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Tổng Doanh Thu
          </p>
          <p className="text-xl font-bold text-blue-600">{revenue}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const { Icon, color } = getIconDetails(stat.icon);
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`${color} p-3 rounded-xl text-white shadow-md`}>
                  <Icon size={24} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {stat.trend}
                  <ArrowUpRight size={12} />
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-1 leading-tight">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Đơn đặt chỗ gần đây</h2>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  <th className="px-6 py-3">Khách hàng</th>
                  <th className="px-6 py-3">Loại</th>
                  <th className="px-6 py-3">Ngày đặt</th>
                  <th className="px-6 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking: any) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-800">
                          {booking.user?.name || "Khách vãng lai"}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {booking.user?.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-gray-700 capitalize">
                          {booking.booking_type || "N/A"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            booking.status === "paid"
                              ? "bg-blue-100 text-blue-600"
                              : booking.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-600"
                                : booking.status === "completed"
                                  ? "bg-cyan-100 text-cyan-600"
                                  : booking.status === "cancelled"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-400 italic text-sm"
                    >
                      Chưa có dữ liệu đặt chỗ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats / Growth Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Thống kê nhanh</h2>
            <Link to="/admin/reports" className="text-xs font-bold text-blue-600 hover:underline">Xem báo cáo</Link>
          </div>

          {dailyRevenue.length > 0 ? (
            <>
              {/* Chart */}
              {(() => {
                const maxRev = Math.max(...dailyRevenue.map((d) => d.revenue), 1);
                const totalRev = dailyRevenue.reduce((s, d) => s + d.revenue, 0);
                const totalOrders = dailyRevenue.reduce((s, d) => s + d.count, 0);
                return (
                  <>
                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-[10px] text-blue-500 font-semibold uppercase">Doanh thu</p>
                        <p className="text-sm font-bold text-blue-700 mt-0.5">
                          {totalRev.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-3">
                        <p className="text-[10px] text-emerald-500 font-semibold uppercase">Đơn đặt</p>
                        <p className="text-sm font-bold text-emerald-700 mt-0.5">{totalOrders} đơn</p>
                      </div>
                    </div>

                    {/* Bar chart */}
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase mb-2 flex items-center gap-1">
                        <TrendingUp size={12} /> Doanh thu 30 ngày
                      </p>
                      <div className="flex items-end gap-[3px] h-28">
                        {dailyRevenue.map((d) => {
                          const pct = (d.revenue / maxRev) * 100;
                          const dateStr = new Date(d.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
                          return (
                            <div
                              key={d.date}
                              className="flex-1 flex flex-col items-center group relative"
                            >
                              {/* Tooltip */}
                              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-20 bg-gray-800 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap shadow-lg">
                                {dateStr}<br />
                                {d.revenue.toLocaleString("vi-VN")}đ<br />
                                {d.count} đơn
                              </div>
                              <div
                                className="w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-colors min-h-[2px] cursor-pointer"
                                style={{ height: `${Math.max(pct, 3)}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      {/* X-axis labels */}
                      <div className="flex justify-between mt-1 text-[9px] text-gray-400">
                        <span>
                          {new Date(dateRange.from).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                        </span>
                        <span>
                          {new Date(dateRange.to).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 size={24} />
                </div>
                <p className="text-sm font-bold text-gray-700">Biểu đồ tăng trưởng</p>
                <p className="text-xs text-gray-400 mt-1">Chưa có dữ liệu trong 30 ngày qua.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
