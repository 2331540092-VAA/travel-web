import { useEffect, useState } from "react";
import LocationCard from "./LocationCard";

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

  /* Load countries */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/countries")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  /* Load ALL locations (1 lần) */
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/locations")
      .then((res) => res.json())
      .then(setAllLocations);
  }, []);

  /* FILTER LOGIC */
  const filteredLocations = allLocations.filter((loc) => {
    const matchCountry = countryId === "all" || loc.country_id === countryId;

    const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase());

    return matchCountry && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold my-8">Destinations</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Tìm địa điểm du lịch..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-5 py-3 rounded-full border outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Country Filter */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {/* ALL */}
        <button
          onClick={() => setCountryId("all")}
          className={`px-4 py-2 rounded-full border ${
            countryId === "all"
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          All
        </button>

        {countries.map((c) => (
          <button
            key={c.id}
            onClick={() => setCountryId(c.id)}
            className={`px-4 py-2 rounded-full border ${
              countryId === c.id
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Locations */}
      {filteredLocations.length === 0 ? (
        <p className="text-gray-500">Không có địa điểm phù hợp</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      )}
    </div>
  );
}
