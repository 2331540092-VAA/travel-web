import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

interface LeafletRoutingProps {
  start: [number, number];
  end: [number, number];
  mode: "walk" | "motorbike" | "car";
}

export default function LeafletRouting({ start, end, mode }: LeafletRoutingProps) {
  const map = useMap();
  const routingControlRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    let profile = "driving";
    if (mode === "walk") profile = "foot";
    if (mode === "motorbike") profile = "driving"; 
    
    // Create custom markers
    const createMarker = (i: number, waypoint: any) => {
      const markerOptions = {
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        })
      };
      return L.marker(waypoint.latLng, markerOptions)
         .bindPopup(i === 0 ? "Vị trí của bạn" : "Điểm đến");
    };

    const control = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: profile,
      }),
      lineOptions: {
        extendToWaypoints: false,
        missingRouteTolerance: 0,
        styles: [{ color: mode === "walk" ? "#10b981" : mode === "motorbike" ? "#f59e0b" : "#3b82f6", weight: 5 }],
      },
      show: false, // hide instructions panel
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      // @ts-ignore
      createMarker: createMarker,
    }).addTo(map);

    routingControlRef.current = control;

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, start[0], start[1], end[0], end[1], mode]);

  return null;
}
