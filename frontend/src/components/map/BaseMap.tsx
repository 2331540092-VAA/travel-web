import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapItem } from "./MapTypes";

interface Props {
  items: MapItem[];
}

export default function BaseMap({ items }: Props) {
  return (
    <MapContainer
      center={[13.5, 108]} // Đông Nam Á
      zoom={5}
      minZoom={4}
      maxZoom={12}
      style={{ height: "450px", width: "100%" }}
      maxBounds={[
        [-15, 90],
        [30, 140],
      ]}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((item) => (
        <Marker
          key={`${item.type}-${item.id}`}
          position={[item.latitude, item.longitude]}
        >
          <Popup>
            <h3 className="font-semibold">{item.name}</h3>

            <Link
              to={`/${item.type}s/${item.id}`}
              className="text-blue-600 text-sm"
            >
              Xem chi tiết
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
