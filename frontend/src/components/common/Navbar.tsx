import { NavLink } from "react-router-dom";

const menus = [
  { label: "Home", path: "/" },
  { label: "Địa điểm", path: "/locations" },
  { label: "Tour", path: "/tours" },
  { label: "Dịch vụ", path: "/services" },
  { label: "Lịch sử đặt", path: "/bookings" },
];

export default function Navbar({ themeActive = false }: { themeActive?: boolean }) {
  return (
    <nav className="hidden md:flex gap-8">
      {menus.map((m) => (
        <NavLink
          key={m.path}
          to={m.path}
          className={({ isActive }) =>
            `text-sm font-medium ${
              themeActive
                ? isActive
                  ? "text-white font-bold"
                  : "text-white/80 hover:text-white"
                : isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          {m.label}
        </NavLink>
      ))}
    </nav>
  );
}
