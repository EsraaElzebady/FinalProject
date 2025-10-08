import { Link } from "react-router-dom";
import { slugify } from "../Store/Store";

export default function NewsCard({ item }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition">
      {/* Image */}
      <Link to={`/blog/${slugify(item.name)}/${slugify(item.title)}`}>
        <div className="w-full lg:h-[450px] sm:h-64 bg-gray-200">
          {item.new_img?.length > 0 ? (
            <div className="w-full h-full overflow-hidden">
              <img
                src={`http://localhost:1337${item.new_img[0].url}`}
                alt={item.title}
                className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      {/* Category badge */}
      <Link to={`/blog/${slugify(item.name)}`}>
        <div className="text-sm font-bold uppercase tracking-wide p-2 flex justify-center items-center mt-[-20px] z-10 text-center">
          <p className="text-black hover:text-white px-2 z-20 hover:bg-black py-1 font-semibold capitalize rounded-sm bg-[#F3F4F6]">
            {item.name}
          </p>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link
          to={`/blog/${slugify(item.name)}/${slugify(item.title)}`}
          className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-center"
        >
          {item.title}
        </Link>
        <p className="text-xs pt-2 text-center sm:text-sm text-gray-600 mb-2">
          By <span className="font-bold text-black">{item.new_author}</span> |{" "}
          {new Date(item.new_date || item.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
  