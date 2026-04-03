import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiGet } from "../../service/api";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface Explore {
  id: number;
  title: string;
  image_url: string;
  description: string;
}

export default function ExploreList() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Explore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiGet<Explore[]>(`/explores?category=${slug}`)
      .then(setData)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white relative flex items-center shadow-lg border-b border-blue-900 border-opacity-20" style={{ height: "45vh", minHeight: "350px", overflow: "hidden" }}>
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Ocean Cover" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-10">
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-blue-100 hover:text-white transition group border border-white/20 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 w-fit text-sm font-medium">
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition" /> Quay lại
          </button>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 capitalize tracking-tight drop-shadow-md">
            Khám phá {slug?.replace(/-/g, " ")}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl font-medium drop-shadow leading-relaxed">
            Hòa mình vào vẻ đẹp ngoạn mục và văn hóa độc đáo của {slug?.replace(/-/g, " ")} thông qua những gợi ý tuyệt vời của Travel SE Asia.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-16 z-20 relative">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-3xl h-80 shadow-sm border border-gray-100">
                <div className="bg-gray-200 h-48 rounded-t-3xl"></div>
                <div className="p-6">
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <Link
                key={item.id}
                to={`/explore/detail/${item.id}`}
                className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition z-10"></div>
                  <img
                    src={item.image_url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    alt={item.title}
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-blue-800 flex items-center gap-1 shadow-sm">
                    <MapPinIcon className="w-3.5 h-3.5" /> Nổi bật
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-semibold text-blue-600">
                    <span className="group-hover:translate-x-1 transition-transform">Xem chi tiết</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center max-w-3xl mx-auto mt-8">
            <div className="text-blue-100 mb-6 flex justify-center">
              <MapPinIcon className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Chưa có dữ liệu trải nghiệm</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Rất tiếc, hiện tại chúng tôi chưa có hành trình nào được gợi ý cho "{slug?.replace(/-/g, " ")}". Hãy tiếp tục quay lại sau hoặc khám phá một số điểm đến khác!
            </p>
            <button
               onClick={() => navigate('/')}
               className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
            >
              Về Trang Chủ Khám Phá
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
