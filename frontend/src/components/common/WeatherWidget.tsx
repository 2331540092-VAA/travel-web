import { useEffect, useState } from "react";
import { apiGet } from "../../service/api";

interface WeatherWidgetProps {
  lat?: string | number;
  lng?: string | number;
  locationId?: number;
}

// Hàm quy đổi mã thời tiết theo chuẩn WMO của Open-Meteo sang chữ/icon
const getWeatherAttr = (code: number) => {
  if (code === 0) return { label: "Nắng Đẹp", icon: "☀️", color: "text-amber-500" };
  if (code === 1 || code === 2 || code === 3) return { label: "Nhiều Mây", icon: "⛅", color: "text-gray-500" };
  if (code === 45 || code === 48) return { label: "Có Sương Mù", icon: "🌫️", color: "text-gray-400" };
  if (code >= 51 && code <= 67) return { label: "Đang Mưa", icon: "🌧️", color: "text-blue-500" };
  if (code >= 71 && code <= 77) return { label: "Có Tuyết", icon: "❄️", color: "text-blue-300" };
  if (code >= 80 && code <= 82) return { label: "Mưa Rào", icon: "🌦️", color: "text-blue-600" };
  if (code >= 95) return { label: "Dông Bão", icon: "⛈️", color: "text-indigo-600" };
  return { label: "Chưa Rõ", icon: "🌡️", color: "text-gray-600" };
};

export default function WeatherWidget({ lat, lng, locationId }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    lat && lng ? { lat: Number(lat), lng: Number(lng) } : null
  );

  useEffect(() => {
    // Nếu chưa có tọa độ nhưng có ID địa điểm, gọi API lấy tọa độ
    if (!coords && locationId) {
      apiGet<any>(`/locations/${locationId}`)
        .then((data) => {
          const resData = data.data ?? data;
          if (resData.lat && resData.lng) {
            setCoords({ lat: Number(resData.lat), lng: Number(resData.lng) });
          }
        })
        .catch((err) => console.error("Could not fetch location coords:", err));
    }
  }, [locationId, coords]);

  useEffect(() => {
    if (!coords) return;
    // Giao tiếp với AI Thời Tiết Open-Meteo (Miễn phí 100%, không cần Key)
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        }
      })
      .catch((err) => console.error("Could not fetch weather:", err));
  }, [coords]);

  // Nếu đang loading thì giấu đi
  if (!weather) return null;

  const weatherInfo = getWeatherAttr(weather.weathercode);

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-2xl shadow-sm mb-6 w-max">
      <div className="text-4xl">{weatherInfo.icon}</div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Thời tiết Trực tiếp</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-800">{weather.temperature}°C</span>
          <span className={`text-sm font-medium ${weatherInfo.color}`}>
            • {weatherInfo.label}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Sức gió: {weather.windspeed} km/h</div>
      </div>
    </div>
  );
}
