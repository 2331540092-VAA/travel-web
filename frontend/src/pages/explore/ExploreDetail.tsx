import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiGet } from "../../service/api";
import { ArrowLeftIcon, MapPinIcon, ShareIcon, HeartIcon } from "@heroicons/react/24/outline";

interface Explore {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: {
    name: string;
    description: string | null;
    slug?: string;
  };
}

export default function ExploreDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [explore, setExplore] = useState<Explore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0);
    apiGet<any>(`/explores/${id}`)
      .then((data) => {
        setExplore(data.data ?? data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
        <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-6 w-full -mt-20">
           <div className="h-40 bg-white rounded-3xl shadow-sm animate-pulse mb-8"></div>
           <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
           <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
           <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!explore) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <MapPinIcon className="w-20 h-20 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Không tìm thấy địa điểm</h2>
        <p className="mb-6">Cảnh quan bạn tìm kiếm đã bị xoá hoặc không tồn tại.</p>
        <Link to="/" className="text-white bg-blue-600 px-6 py-2 rounded-full font-medium hover:bg-blue-700">Về Trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] bg-slate-900 overflow-hidden">
         <img
          src={explore.image_url}
          alt={explore.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-6 left-6 z-10 w-full flex justify-between px-6 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Quay lại
          </button>
          <div className="flex gap-2 pr-12">
            <button className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-4 uppercase tracking-wider text-sm">
            <MapPinIcon className="w-5 h-5" /> {explore.category?.name || 'Khám phá'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {explore.title}
          </h1>
          <hr className="my-8 border-gray-100" />
          
          <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed text-left">
            {explore.description.split('\\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-justify">{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
             <h4 className="font-bold text-blue-900 mb-2">💡 Gợi ý cho bạn</h4>
             <p className="text-blue-800/80 text-sm">Trang bị kính râm, kem chống nắng và một người thợ chụp ảnh có tâm để có thể lưu giữ những khoảnh khắc đẹp nhất tại đây nhé.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
