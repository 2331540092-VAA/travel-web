import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function LocationDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/locations/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!data) return <p className="text-center py-20">Location not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Địa điểm", path: "/locations" },
          { label: data.name },
        ]}
      />

      {/* Cover */}
      {data.image_url && (
        <img
          src={data.image_url}
          className="w-full h-[420px] object-cover rounded-3xl mb-8"
        />
      )}

      {/* Gallery */}
      {data.gallery?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {data.gallery.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              className="h-40 w-full object-cover rounded-2xl hover:scale-105 transition"
            />
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p className="text-gray-700 mb-12">{data.description}</p>
    </div>
  );
}
