import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    name: "Bali",
    country: "Indonesia",
    tours: 15,
    locationId: 9,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Hạ Long",
    country: "Việt Nam",
    tours: 8,
    locationId: 5,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Phuket",
    country: "Thái Lan",
    tours: 10,
    locationId: 8,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Đà Nẵng",
    country: "Việt Nam",
    tours: 12,
    locationId: 3,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="mb-24 px-4 md:px-0">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Điểm đến được yêu thích
          </h2>
          <p className="text-slate-500 font-medium">
            Khám phá những vùng đất hứa hẹn mang lại trải nghiệm tuyệt vời nhất.
          </p>
        </div>
        <Link to="/locations" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition">
          Xem tất cả <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <Link
            key={item.name}
            to={`/locations/${item.locationId}`}
            className="group relative block rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 aspect-[4/5]"
          >
            {/* Image Source */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                alt={item.name}
              />
            </div>

            {/* Vertical Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-cyan-400 font-bold mb-1 text-sm tracking-wider uppercase">{item.country}</p>
              <h3 className="font-extrabold text-white text-2xl mb-2">{item.name}</h3>
              <div className="flex items-center gap-2 text-slate-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span>Khám phá {item.tours} tours</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/locations" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
          Xem tất cả <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

