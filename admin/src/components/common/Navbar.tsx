import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Tìm kiếm nội dung..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600/20 text-sm outline-none transition-all"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => alert("Hiện tại chưa có thông báo mới!")}
          className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin"}</p>
            <p className="text-xs text-gray-500">{user?.role || "Quản trị viên"}</p>
          </div>
          <div className="w-9 h-9 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600 border border-blue-600/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}

