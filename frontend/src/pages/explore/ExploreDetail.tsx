import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Explore {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function ExploreDetail() {
  const { id } = useParams();
  const [explore, setExplore] = useState<Explore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/explores/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExplore(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!explore) {
    return <p className="text-center py-20">Explore not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      {/* Back */}
      <Link
        to={`/explore/${explore.category}`}
        className="inline-block mt-6 mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Explore
      </Link>

      {/* Image */}
      <div className="rounded-3xl overflow-hidden shadow mb-8">
        <img
          src={explore.image}
          alt={explore.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Content */}
      <h1 className="text-3xl font-bold mb-2">{explore.title}</h1>

      <span className="inline-block mb-6 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
        {explore.category}
      </span>

      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {explore.description}
      </div>
    </div>
  );
}
