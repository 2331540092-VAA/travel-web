import { useEffect, useState } from "react";
import { apiGet } from "../../service/api";
import LocationCard from "./LocationCard";
import Loader from "../../components/common/Loader";
import { Search, MapPin } from "lucide-react";

interface Country {
  id: number;
  name: string;
}

interface Location {
  id: number;
  name: string;
  description: string;
  image_url: string;
  address: string;
  country_id: number;
  tag?: string;
  hotels_count?: number;
  tours_count?: number;
}

export default function LocationPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [countryId, setCountryId] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiGet<any>("/countries"),
      apiGet<any>("/locations")
    ])
    .then(([countriesRes, locationsRes]) => {
      const cData = Array.isArray(countriesRes) ? countriesRes : countriesRes.data || [];
      const lData = Array.isArray(locationsRes) ? locationsRes : locationsRes.data || [];
      
      setCountries(cData);
      setAllLocations(lData);
    })
    .finally(() => setLoading(false));
  }, []);

  const filteredLocations = allLocations.filter((loc) => {
    const matchCountry = countryId === "all" || loc.country_id === countryId;
    const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase());
    return matchCountry && matchSearch;
  });

  if (loading) return <Loader text="Đang tải các điểm đến tuyệt vời..." />;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white py-16 px-4 md:px-0 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Điểm đến mộng mơ</h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Khám phá những vùng đất mới, trải nghiệm văn hóa đa dạng và tạo ra những kỷ niệm khó quên.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Bạn muốn đi đâu hôm nay?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-800 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex-1 overflow-x-auto scrollbar-hide w-full md:w-auto">
            <div className="flex gap-2 min-w-max px-2">
              <button
                onClick={() => setCountryId("all")}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  countryId === "all"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <MapPin className="w-4 h-4" /> Tất cả khu vực
              </button>

              {countries.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCountryId(c.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    countryId === c.id
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        {filteredLocations.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4 text-3xl">🏜️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy địa điểm</h3>
            <p className="text-slate-500">Vui lòng thử từ khóa tìm kiếm hoặc bộ lọc khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredLocations.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
