import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotificationBell from "./NotificationBell";
import { API_BASE } from "../../service/api";
import { useTheme } from "../theme/ThemeProvider";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    };
    loadUser();

    window.addEventListener("userProfileUpdated", loadUser);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("userProfileUpdated", loadUser);
    };
  }, []);

  const hasTheme = !!theme;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? hasTheme
            ? "backdrop-blur-xl shadow-md py-3"
            : "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 py-3"
          : hasTheme
            ? "py-4"
            : "bg-white border-b py-4"
      }`}
      style={
        hasTheme
          ? {
              background: isScrolled
                ? `linear-gradient(135deg, ${theme.primary_color}ee, ${theme.secondary_color}ee)`
                : `linear-gradient(135deg, ${theme.primary_color}, ${theme.secondary_color})`,
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {theme?.logo_url && (
              <img src={theme.logo_url} alt="" className="w-8 h-8 rounded" />
            )}
            <span className={`text-xl font-bold ${hasTheme ? "text-white" : "text-blue-600"}`}>
              Travel SE Asia
            </span>
          </Link>

          {/* Menu */}
          <Navbar themeActive={hasTheme} />

          {/* Account */}
          <div className="flex items-center gap-3">
            {user && <NotificationBell />}
            {user ? (
              <Link
              to={`/profile/${user.id}`}
              className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 transition-colors shadow-sm ${
                hasTheme ? "border-white/30 hover:border-white" : "border-transparent hover:border-blue-400"
              }`}
              title={user.name}
            >
              <img
                src={
                  user.avatar_url
                    ? `${API_BASE.replace("/api", "/storage")}/${user.avatar_url}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0284c7&color=fff`
                }
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                hasTheme ? "bg-white/20 hover:bg-white/30 text-white" : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              👤
            </Link>
          )}
          </div>
        </div>
      </div>
    </header>
  );
}
