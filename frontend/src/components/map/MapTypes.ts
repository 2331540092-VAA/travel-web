export type MapItemType = "location" | "hotel" | "restaurant" | "tour";

export interface MapItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: MapItemType;
}
