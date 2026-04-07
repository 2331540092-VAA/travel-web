import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { API_BASE } from "../../service/api";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 py-3"
          : "bg-white border-b py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">
              Travel SE Asia
            </span>
          </Link>

          {/* Menu */}
          <Navbar />

          {/* Account */}
          {user ? (
            <Link
              to={`/profile/${user.id}`}
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-blue-400 transition-colors shadow-sm"
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
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              👤
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
