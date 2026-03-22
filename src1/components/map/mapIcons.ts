import L from "leaflet";

/**
 * Tạo Leaflet Icon từ ảnh
 */
const createIcon = (iconUrl: string) =>
  L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

export const locationIcon = () => createIcon("/icons/location.png");

export const hotelIcon = () => createIcon("/icons/hotel.png");

export const restaurantIcon = () => createIcon("/icons/restaurant.png");

export const userIcon = () => createIcon("/icons/user.png");
