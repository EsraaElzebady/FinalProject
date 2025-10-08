import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // split path => [ "", "shop", "123" ]
  const paths = location.pathname.split("/").filter((p) => p);
  if (paths.length === 0) {
    return null; 
  }

  return (
    <nav className="text-sm bg-[#F5F5F5] w-full mb-6">
      <ol className="flex items-center justify-center p-3 space-x-2 text-gray-600">
        <li>
          <Link to="/" className="hover:underline text-black font-medium">
            Home
          </Link>
        </li>

        {paths.map((segment, index) => {
          const url = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          // Capitalize segment
          const label =
          segment.toLowerCase() === "blog"
            ? "News"
            : segment.toLowerCase() === "shop"
            ? "Beauty And Cosmetics"
            : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
        

          return (
            <li key={url} className="flex items-center">
              <span className="mx-2">›</span>
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <Link to={url} className="hover:underline text-black font-medium">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
