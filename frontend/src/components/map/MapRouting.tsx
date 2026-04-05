import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// icon leaflet (vite)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapItem {
  id: number;
  title: string;
  type: string;
  lat: number;
  lng: number;
}

interface Props {
  items: MapItem[];
}

const getIconByType = (type: string) => {
  let color = "blue";

  if (type === "hotel") color = "blue";
  else if (type === "restaurant") color = "green";
  else color = "red";

  return L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    className: `marker-${color}`,
  });
};

const MapMarkers = ({ items }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (items.length > 0) {
      const first = items[0];
      map.setView([first.lat, first.lng], 13);
    }
  }, [items, map]);

  return (
    <>
      {items.map((item) => {
        if (!item.lat || !item.lng) return null;

        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={getIconByType(item.type)}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              <a href={`/${item.type}/${item.id}`} style={{ color: "#2563eb" }}>
                Xem chi tiết
              </a>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default MapMarkers;
