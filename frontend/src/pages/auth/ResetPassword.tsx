import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiPost } from "../../service/api";
import { Loader2, Lock, Eye, EyeOff, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      toast.error("Link đặt lại mật khẩu không hợp lệ.");
      navigate("/forgot-password");
    }
  }, [token, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    try {
      await apiPost("/reset-password", {
        email,
        token,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      setSuccess(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Token không hợp lệ hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-slate-900">
      {/* NÚT QUAY LẠI */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all group shadow-lg"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-bold uppercase tracking-widest">
          Đăng nhập
        </span>
      </button>

      {/* LAYER ẢNH NỀN */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-[10s] scale-110 hover:scale-100"
        style={{
          backgroundImage:
            "url('https://vmstyle.vn/wp-content/uploads/2025/09/hinh-nen-thien-nhien-hung-vi-nhat-the-gioi-nui-cao-va-thac-nuoc-4k.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-90"></div>
      </div>

      {/* FORM */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-[16px] rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/20 z-10 animate-in fade-in zoom-in duration-700">
        {success ? (
          /* THÀNH CÔNG */
          <div className="text-center py-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-cyan-400" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">
              Đặt lại thành công!
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập với mật khẩu mới.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-4 rounded-2xl font-black shadow-[0_10px_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Đăng nhập ngay
            </button>
          </div>
        ) : (
          /* FORM ĐẶT LẠI */
          <>
            <div className="mb-10 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 mb-4">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[3px]">
                  Đặt lại mật khẩu
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic">
                MẬT KHẨU <span className="text-cyan-400">MỚI</span>
              </h1>
              <p className="text-slate-300 text-sm font-light">
                Nhập mật khẩu mới cho{" "}
                <span className="text-cyan-400 font-bold">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mật khẩu mới */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-[2px] ml-1">
                  Mật khẩu mới
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-black/30 transition-all shadow-inner"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-[2px] ml-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    size={18}
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.password_confirmation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password_confirmation: e.target.value,
                      })
                    }
                    placeholder="Nhập lại mật khẩu"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-black/30 transition-all shadow-inner"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-4 rounded-2xl font-black shadow-[0_10px_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] disabled:bg-slate-700 disabled:text-slate-400 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Xác nhận đặt lại mật khẩu"
                )}
              </button>
            </form>

            <p className="text-center mt-10 text-white/40 text-xs font-medium tracking-wide">
              Link hết hạn?{" "}
              <Link
                to="/forgot-password"
                className="text-cyan-400 font-black hover:text-white transition-colors border-b border-cyan-400/30 pb-0.5"
              >
                Gửi lại email
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
