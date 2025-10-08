import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePaginationStore } from "../../Store/Store";
import { fetchData } from "../../Store/fetchData";
import Breadcrumbs from "../../Components/UI/Breadcrumbs";
import HeadOfPage from "../../Components/UI/HeadOfPage";
import Loader from "../../Components/UI/Loader";
import NewsCard from "../../Components/NewsCard";
import Pagination from "../../Components/UI/Pagination";
export default function MakeUp() {
  const { name } = useParams(); // ✅ grab ":name" from URL

  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const { currentPage } = usePaginationStore();
  const [pagesNumber, setPagesNumber] = useState(1);

  const pageSize = 9;

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      try {
        const res = await fetchData("news", {
          populate: "*",
          pagination: { page: currentPage, pageSize },
          filters: { name: { $contains: name } }, // ✅ use param
        });

        const filtered = res.data;
        setNews(filtered);

        const total = filtered.length;
        setPagesNumber(Math.ceil(total / pageSize));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, [currentPage, name]); // ✅ refetch when name changes

  return (
    <>
      <Breadcrumbs />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <HeadOfPage text={`${name}`} />

          {isLoading ? (
            <Loader />
          ) : news.length === 0 ? (
            <p className="text-center text-gray-500">
              No {name} news available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-[1200px] mx-auto">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <Pagination totalPages={pagesNumber} />
        </div>
      </div>
    </>
  );
}
