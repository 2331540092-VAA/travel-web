const destinations = [
  {
    name: "Ha Long Bay",
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1558005530-a7958896ec60",
  },
  {
    name: "Angkor Wat",
    country: "Cambodia",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    name: "Phuket",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6">Địa điểm nổi bật</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <a
            key={item.name}
            href="/locations"
            className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              className="w-full h-48 object-cover"
              alt={item.name}
            />
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.country}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
