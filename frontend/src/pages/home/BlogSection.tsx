import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../service/api";
import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/theme/ThemeProvider";

interface Blog {
  id: number;
  title: string;
  cover_url: string;
  created_at: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    apiGet<Blog[]>("/blogs")
      .then((data) => {
        const arrayData = Array.isArray(data) ? data : (data as any).data || [];
        const shuffled = arrayData.sort(() => Math.random() - 0.5);
        setBlogs(shuffled.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="mb-20 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Cẩm nang du lịch
        </h2>
        <Link
          to="/blogs"
          className="flex items-center gap-1 text-sm font-semibold transition"
          style={{ color: theme?.primary_color || '#3b82f6' }}
        >
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {blogs.map((blog) => (
          <motion.div variants={itemVariants} key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              className="group flex flex-col rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100"
              style={{ backgroundColor: theme ? `color-mix(in srgb, ${theme.primary_color} 4%, #f8fafc)` : '#f8fafc' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.cover_url}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                  alt={blog.title}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(blog.created_at).toLocaleDateString("vi-VN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
