import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../../service/api";

interface Explore {
  id: number;
  title: string;
  image_url: string;
  description: string;
}

export default function ExploreList() {
  const { slug } = useParams();
  const [data, setData] = useState<Explore[]>([]);

  useEffect(() => {
    apiGet<Explore[]>(`/explores?category=${slug}`).then(setData);
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">{slug}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <a
            key={item.id}
            href={`/explore/detail/${item.id}`}
            className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.image_url}
              className="h-56 w-full object-cover"
              alt={item.title}
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
