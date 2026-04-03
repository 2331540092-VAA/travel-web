import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { API_BASE } from "../../service/api";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [avatarVersion, setAvatarVersion] = useState(Date.now());

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
        setAvatarVersion(Date.now());
      }
    };
    
    loadUser();

    // Listen for custom event when profile updates globally
    window.addEventListener("userProfileUpdated", loadUser);
    return () => window.removeEventListener("userProfileUpdated", loadUser);
  }, []);

  return (
    <header className="bg-white border-b">
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
              className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 overflow-hidden border-2 border-white hover:border-blue-200 shadow-sm"
              title={user.name}
            >
              <img
                src={
                  user.avatar_url
                    ? `${API_BASE.replace("/api", "/storage")}/${user.avatar_url}?v=${avatarVersion}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=dbeafe&color=2563eb&bold=true`
                }
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
            >
              👤
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
