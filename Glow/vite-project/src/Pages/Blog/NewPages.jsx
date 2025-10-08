// import { useEffect, useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import { Link, useParams } from "react-router-dom";
// import { fetchData } from "../../Store/fetchData";
// import Breadcrumbs from "../../Components/UI/Breadcrumbs";

// export default function NewPages() {
//   const { newName } = useParams(); // /news/:newName
//   const [isLoading, setIsLoading] = useState(false);
//   const [news, setNews] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagesNumber, setPagesNumber] = useState(1);

//   const pageSize = 9;

//   useEffect(() => {
//     const getNews = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetchData("news", {
//           populate: "*",
//           pagination: {
//             page: currentPage,
//             pageSize: pageSize,
//           },
//           filters: {
//             category: {
//               $eq: newName, // filter by category field from route param
//             },
//           },
//         });

//         console.log("Filter:", newName);
//         console.log("API response:", res);

//         setNews(res.data);

//         const total = res.meta?.pagination?.total || res.data.length;
//         setPagesNumber(Math.ceil(total / pageSize));
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getNews();
//   }, [currentPage, newName]);

//   return (
//     <>
//       <Breadcrumbs />
//       <div className="min-h-screen bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
//             {newName}
//           </h1>

//           {isLoading ? (
//             <div className="flex justify-center items-center flex-wrap h-[300px]">
//               <ClipLoader color="#2563eb" size={60} />
//             </div>
//           ) : news.length === 0 ? (
//             <p className="text-center text-gray-500">
//               No {newName} news available.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:max-w-[1200px] mx-auto">
//               {news.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={`/blog/${item.documentId || item.id}`}
//                   className="bg-white rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition"
//                 >
//                   {/* Image */}
//                   <div className="w-full lg:h-[450px] sm:h-64 bg-gray-200">
//                     {item.new_img?.length > 0 ? (
//                       <div className="w-full h-full overflow-hidden">
//                         <img
//                           src={`http://localhost:1337${item.new_img[0].url}`}
//                           alt={item.title}
//                           className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
//                         />
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-gray-400">
//                         No Image
//                       </div>
//                     )}
//                   </div>

//                   {/* Content */}
//                   <div className="p-4 flex flex-col flex-grow">
//                     <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//                       {item.category}
//                     </p>
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
//                       {item.title}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-600 mb-2">
//                       ✍️ {item.new_author}
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-3">
//                       {item.desc}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-auto">
//                       📅{" "}
//                       {new Date(
//                         item.new_date || item.publishedAt
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}

//           {/* ✅ Pagination */}
//           <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
//             {/* Prev */}
//             <button
//               className="text-black hover:bg-[#F5F5F5] rounded-full text-xs sm:text-sm p-2 sm:p-3 disabled:opacity-0"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 sm:h-5 sm:w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M18 6 L12 12 L18 18" />
//                 <path d="M12 6 L6 12 L12 18" />
//               </svg>
//             </button>

//             {Array.from({ length: pagesNumber }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm ${
//                   currentPage === i + 1
//                     ? "bg-[#F5F5F5] text-black opacity-75 cursor-default"
//                     : "text-black hover:bg-[#F5F5F5]"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             {/* Next */}
//             <button
//               className="text-black hover:bg-[#F5F5F5] rounded-full text-xs sm:text-sm p-2 sm:p-3 disabled:opacity-0"
//               disabled={currentPage === pagesNumber}
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 sm:h-5 sm:w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M6 6 L12 12 L6 18" />
//                 <path d="M12 6 L18 12 L12 18" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
