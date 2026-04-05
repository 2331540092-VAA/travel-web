import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../../service/api";
import Loader from "../../components/common/Loader";
import Breadcrumb from "../../components/common/Breadcrumb";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import LeafletRouting from "../../components/map/LeafletRouting";
import { MapPin, Navigation, Info, ExternalLink, Heart } from "lucide-react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type TransportMode = "walk" | "motorbike" | "car";

interface NearbyService {
  id: number;
  name: string;
  image_url: string;
  address?: string;
  type: "hotel" | "restaurant";
}

export default function LocationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [transportMode, setTransportMode] = useState<TransportMode>("motorbike");
  const [nearbyServices, setNearbyServices] = useState<NearbyService[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const favs = JSON.parse(localStorage.getItem("favorite_locations") || "[]");
      setIsFavorite(favs.includes(Number(id)));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    const locId = Number(id);
    let favs = JSON.parse(localStorage.getItem("favorite_locations") || "[]");
    
    if (favs.includes(locId)) {
      favs = favs.filter((f: number) => f !== locId);
      setIsFavorite(false);
    } else {
      favs.push(locId);
      setIsFavorite(true);
    }
    localStorage.setItem("favorite_locations", JSON.stringify(favs));
  };

  useEffect(() => {
    apiGet<any>(`/locations/${id}`)
      .then((res) => {
        const locationData = res.data || res;
        setData(locationData);

        const services: NearbyService[] = [];
        if (locationData.hotels) {
          locationData.hotels.forEach((h: any) => services.push({ ...h, type: "hotel" }));
        }
        if (locationData.restaurants) {
          locationData.restaurants.forEach((r: any) => services.push({ ...r, type: "restaurant" }));
        }
        setNearbyServices(services.slice(0, 4));
        setLoading(false);

        if (locationData.lat && locationData.lng) {
          const lat = parseFloat(locationData.lat);
          const lng = parseFloat(locationData.lng);
          setUserLocation([lat - 0.03, lng - 0.03]);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
              () => {}
            );
          }
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Removed getTransportInfo since it is no longer used in the new UI

  if (loading) return <Loader text="Đang tải thông tin địa điểm..." />;
  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-6xl mb-4">📍</div>
      <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy địa điểm</h2>
      <Link to="/locations" className="text-blue-600 mt-4 hover:underline">Quay lại danh sách</Link>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Cover */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-900 mb-8">
        <div className="absolute top-6 left-6 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Quay lại
          </button>
        </div>
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={toggleFavorite}
            className="flex items-center justify-center p-3 bg-black/30 backdrop-blur-md rounded-full text-white shadow-md transition-all duration-300 hover:bg-white group border border-white/20"
            title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
          >
            <Heart 
              className={`w-5 h-5 transition-colors duration-300 ${
                isFavorite 
                  ? "fill-red-500 text-red-500" 
                  : "text-white group-hover:text-red-500"
              }`} 
            />
          </button>
        </div>
        <img
          src={data.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200"}
          className="w-full h-full object-cover opacity-70"
          alt={data.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 pb-12">
          <Breadcrumb
            items={[
              { label: "Trang chủ", path: "/" },
              { label: "Địa điểm", path: "/locations" },
              { label: data.name },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight drop-shadow-md">
            {data.name}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Info */}
          <div className="lg:w-2/3 space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-500" />
                Giới thiệu
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {data.description}
              </p>
            </section>

            {/* Map & Routing */}
            {data.lat && data.lng && userLocation && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-blue-500" />
                    Bản đồ & Chỉ đường
                  </h2>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
                    {(["walk", "motorbike", "car"] as TransportMode[]).map((mode) => {
                      const info = {
                        walk: { label: "Đi bộ", icon: "🚶" },
                        motorbike: { label: "Xe máy", icon: "🏍️" },
                        car: { label: "Ô tô", icon: "🚗" },
                      }[mode];
                      return (
                        <button
                          key={mode}
                          onClick={() => setTransportMode(mode)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                            transportMode === mode
                              ? "bg-white text-blue-600 shadow-sm"
                              : "text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {info.icon} <span className="hidden sm:inline">{info.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 relative z-0 h-[450px]">
                  <MapContainer
                    center={[(parseFloat(data.lat) + userLocation[0]) / 2, (parseFloat(data.lng) + userLocation[1]) / 2]}
                    zoom={13}
                    style={{ height: "100%", width: "100%", zIndex: 1 }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LeafletRouting
                      start={userLocation}
                      end={[parseFloat(data.lat), parseFloat(data.lng)]}
                      mode={transportMode}
                    />
                  </MapContainer>
                </div>
              </section>
            )}

            {/* Photo Gallery */}
            {data.gallery?.length > 0 && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Thư viện ảnh</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.gallery.map((img: string, i: number) => (
                    <div key={i} className="relative group rounded-2xl overflow-hidden aspect-square">
                      <img
                        src={img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={`${data.name} gallery ${i}`}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 border border-black/5 rounded-2xl"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-6">
              
              {/* Quick Info Card */}
              {data.address && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" /> Vị trí
                  </h3>
                  <p className="text-slate-600 font-medium">
                    {data.address}
                  </p>
                </div>
              )}

              {/* Nearby Services */}
              {nearbyServices.length > 0 && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-lg text-slate-900 mb-5 border-b border-slate-100 pb-3">
                    Tiện ích lân cận
                  </h3>
                  <div className="space-y-4">
                    {nearbyServices.map((service) => (
                      <Link
                        key={`${service.type}-${service.id}`}
                        to={service.type === "hotel" ? `/services/${service.id}` : "#"}
                        className="flex items-center gap-4 group hover:bg-slate-50 p-2 rounded-2xl transition-colors"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          <img
                            src={service.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400"}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              service.type === "hotel"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {service.type === "hotel" ? "Khách sạn" : "Nhà hàng"}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm mt-1 truncate group-hover:text-blue-600 transition-colors">
                            {service.name}
                          </h4>
                          {service.address && (
                            <p className="text-xs text-slate-500 truncate mt-0.5">{service.address}</p>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
