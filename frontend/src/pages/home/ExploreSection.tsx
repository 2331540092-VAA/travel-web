const explores = [
  {
    title: "Scenery",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    slug: "nature",
  },
  {
    title: "Food",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    slug: "food",
  },
  {
    title: "Entertainment",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    slug: "entertainment",
  },
  {
    title: "Culture",
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    slug: "culture",
  },
];

export default function ExploreSection() {
  return (
    <section className="mb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Khám phá</h2>
        <a href="/explore" className="text-blue-600 text-sm">
          See all
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {explores.map((item) => (
          <a
            key={item.slug}
            href={`/explore/${item.slug}`}
            className="relative h-48 rounded-2xl overflow-hidden group"
          >
            <img
              src={item.image}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {item.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
