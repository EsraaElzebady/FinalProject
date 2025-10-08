import { useEffect, useState } from "react";
import { fetchData } from "../../Store/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

export default function NewsSwiperRelated({ currentId }) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData("news", {
          populate: "*",
          pagination: { page: 1, pageSize: 10 },
        });
        // Exclude the currently opened news
        const filtered = res.data.filter(item => (item.documentId || item.id) !== currentId);
        setNews(filtered);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, [currentId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <ClipLoader color="#2563eb" size={50} />
      </div>
    );
  }

  if (!news.length) {
    return <p className="text-center text-gray-500">No related news available.</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {news.map((item) => (
        <SwiperSlide  key={item.id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="w-full h-48 bg-gray-200">
              {item.new_img?.length > 0 ? (
                <img
                  src={`http://localhost:1337${item.new_img[0].url}`}
                  alt={item.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col">
              <h2 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {item.title}
              </h2>
              <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
              <p className="text-xs text-gray-400 mt-2">
                📅 {new Date(item.new_date || item.publishedAt).toLocaleDateString()}
              </p>
       
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
