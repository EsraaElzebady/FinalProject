import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './SingleNewPage.css';
import { fetchData } from "../../Store/fetchData";
import Loader from "../../Components/UI/Loader";
import Breadcrumbs from "../../Components/UI/Breadcrumbs";
import { slugify } from "../../Store/Store";

export default function SingleNewPage() {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsAndRelated = async () => {
      setLoading(true);
      try {
        const res = await fetchData("news", { populate: "*" });
        // Single news
        const matched = res.data.find(item => slugify(item.title) === decodedSlug);
        setNews(matched || null);

        // Related news (exclude current, limit 6)
        const related = res.data.filter(item => slugify(item.title) !== decodedSlug).slice(0, 6);
        setRelatedNews(related);

      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndRelated();
  }, [decodedSlug]);

  if (loading) return <Loader />;
  if (!news) return <p className="text-center text-gray-500">News not found.</p>;

  return (
    <>
      <Breadcrumbs />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-600 mb-4">✍️ {news.new_author}</p>
        <p className="text-xs text-gray-400 mb-6">
          {new Date(news.new_date || news.publishedAt).toLocaleDateString()}
        </p>

        {news.new_img?.length > 0 && (
          <img
            src={`http://localhost:1337${news.new_img[0].url}`}
            alt={news.title}
            className="mb-6"
          />
        )}

        <p className="text-gray-700 text-lg leading-relaxed">{news.desc}</p>

        <h2 className="mt-12 mb-4 text-2xl font-bold">Related News</h2>
        {relatedNews.length === 0 ? (
          <p className="text-gray-500">No related news available.</p>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true,
              el:'.custom-pagination'
             }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {relatedNews.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/blog/${slugify(item.title)}`}>
                  <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="w-full overflow-hidden h-48 bg-gray-200">
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
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        📅 {new Date(item.new_date || item.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
                <div className="w-full p-2 mt-10"> <div className="custom-pagination flex justify-center "></div> </div> 

      </div>
    </>
  );
}
