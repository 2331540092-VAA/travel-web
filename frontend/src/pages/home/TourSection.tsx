import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/theme/ThemeProvider";

interface Tour {
  id: number;
  name: string;
  image_url: string;
  days?: number;
  price: number;
  discount_percent?: number;
  departure_location?: string;
  transport?: string;
}

export default function HotToursSection() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tours")
      .then((res) => res.json())
      .then((data) => {
        const allTours: Tour[] = data.data ?? data;
        const hotTours = allTours
          .sort((a, b) => (b.discount_percent ?? 0) - (a.discount_percent ?? 0))
          .slice(0, 4);
        setTours(hotTours);
      })
      .catch((err) => console.error("Lỗi fetch tour:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-medium text-slate-500">
        Đang tải các tour hấp dẫn nhất...
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="mb-24 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-end mb-10"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Ưu đãi tour{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"
              style={theme ? { backgroundImage: `linear-gradient(to right, ${theme.primary_color}, ${theme.accent_color})` } : undefined}
            >
              sốc nhất
            </span>
          </h2>
          <p className="text-slate-500 font-medium max-w-lg">
            Khám phá những điểm đến tuyệt vời với mức giá độc quyền chỉ có tại
            Travel SE Asia.
          </p>
        </div>
        <Link
          to="/tours"
          className="hidden md:flex items-center gap-2 font-semibold hover:text-blue-700 transition"
          style={{ color: theme?.primary_color || undefined }}
        >
          Xem tất cả <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {tours.map((tour) => {
          const discount =
            tour.discount_percent && tour.discount_percent > 0
              ? tour.discount_percent
              : 10;
          const currentPrice = Number(tour.price) || 0;
          const originalPrice = Math.round(currentPrice / (1 - discount / 100));

          return (
            <motion.div
              variants={itemVariants}
              key={tour.id}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
              style={theme ? { background: `color-mix(in srgb, ${theme.primary_color} 3%, #ffffff)`, borderColor: `color-mix(in srgb, ${theme.primary_color} 12%, #e2e8f0)` } : undefined}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.image_url}
                  alt={tour.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-red-600 px-3 py-1 rounded-xl text-sm font-bold shadow-sm">
                  🔥 -{discount}%
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 relative">
                <h3 className="font-bold text-[1.15rem] tracking-tight text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {tour.name}
                </h3>

                <div className="flex flex-col gap-1 mb-5 border-b border-slate-100 pb-5">
                  <div className="flex items-end gap-2">
                    <span className="text-red-500 font-extrabold text-2xl">
                      {currentPrice.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <span className="text-slate-400 line-through text-xs font-medium">
                    {originalPrice.toLocaleString("vi-VN")} VND
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-slate-500 font-medium mb-8">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: theme?.primary_color || '#3b82f6' }} />
                    {tour.departure_location || "TP.HCM"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: theme?.primary_color || '#3b82f6' }} />
                    {tour.days || 1} ngày
                  </span>
                  <span className="flex items-center gap-1.5 col-span-2">
                    <Plane className="w-3.5 h-3.5" style={{ color: theme?.primary_color || '#3b82f6' }} />
                    {tour.transport || "Máy bay / Ô tô"}
                  </span>
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    to={`/tours/${tour.id}`}
                    className="flex justify-center items-center w-full bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white font-semibold py-3.5 rounded-xl transition duration-300 border border-slate-200 hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.2)]"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
