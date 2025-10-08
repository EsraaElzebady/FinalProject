import { useEffect, useState, useCallback } from "react";
import { fetchData } from "../../Store/fetchData";
import Loader from "../../Components/UI/Loader";
import Breadcrumbs from "../../Components/UI/Breadcrumbs";
import HeadOfPage from "../../Components/UI/HeadOfPage";
import Pagination from "../../Components/UI/Pagination";
import { usePaginationStore } from "../../Store/Store";
import NewsCard from "../../Components/NewsCard";
import ScrollToTopWithProgress from "../../Components/UI/ScrollProgressCircle";

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { currentPage } = usePaginationStore();
  const pageSize = 9;

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchData("news", {
        populate: "*",
        pagination: { page: currentPage, pageSize },
      });
      setNews(res.data || []);
      const total = res.meta?.pagination?.total || res.data.length;
      setTotalPages(Math.ceil(total / pageSize));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="relative">
      <Breadcrumbs />
      <div className="min-h-screen  bg-white">
        <div className="container-custom mx-auto px-6 sm:px-6 lg:px-10 py-6">
          <HeadOfPage text="News" />

          {isLoading && <Loader />}
          {!isLoading && news.length === 0 && (
            <p className="text-center text-gray-500">No news available.</p>
          )}
          {!isLoading && news.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-[1200px] mx-auto">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Pagination totalPages={totalPages} />
        </div>
      </div>
          <div className='abslote  bottom-1'>
              <ScrollToTopWithProgress />
            </div>

    </div>
  );
}
