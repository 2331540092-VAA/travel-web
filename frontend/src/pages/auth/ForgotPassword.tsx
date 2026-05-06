import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiPost } from "../../service/api";
import { Loader2, Mail, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPost("/forgot-password", { email });
      setSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-slate-900">
      {/* NÚT QUAY LẠI */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all group shadow-lg"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-bold uppercase tracking-widest">
          Quay lại
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
        {sent ? (
          /* TRẠNG THÁI ĐÃ GỬI */
          <div className="text-center py-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-cyan-400" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white mb-3">
              Email đã được gửi!
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Kiểm tra hộp thư <span className="text-cyan-400 font-bold">{email}</span> và nhấn vào link để đặt lại mật khẩu.
              Link có hiệu lực trong <span className="text-cyan-400 font-bold">60 phút</span>.
            </p>
            <p className="text-white/40 text-xs">
              Không nhận được email?{" "}
              <button
                onClick={() => setSent(false)}
                className="text-cyan-400 font-bold hover:text-white transition-colors border-b border-cyan-400/30 pb-0.5"
              >
                Gửi lại
              </button>
            </p>
          </div>
        ) : (
          /* FORM NHẬP EMAIL */
          <>
            <div className="mb-10 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 mb-4">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[3px]">
                  Khôi phục tài khoản
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic">
                QUÊN <span className="text-cyan-400">MẬT KHẨU?</span>
              </h1>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Nhập email đăng ký của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-white/50 uppercase tracking-[2px] ml-1">
                  Email của bạn
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:scale-110 transition-transform"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:bg-black/30 transition-all shadow-inner"
                    required
                  />
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
                  "Gửi link đặt lại mật khẩu"
                )}
              </button>
            </form>

            <p className="text-center mt-10 text-white/40 text-xs font-medium tracking-wide">
              Nhớ mật khẩu rồi?{" "}
              <Link
                to="/login"
                className="text-cyan-400 font-black hover:text-white transition-colors border-b border-cyan-400/30 pb-0.5"
              >
                Đăng nhập
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
