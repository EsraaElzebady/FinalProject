import React, { useState, useEffect } from "react";

import ProductCard from "../ProductCard/ProductCard";
import { fetchData } from "../../Store/fetchData";
import SearchIcon from "../UI/Search/SearchIcon";

export default function SearchOffcanvas({ isSearchOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  // ✅ Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen, onClose]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetchData('products', {
        
          filters: {
            product_name: {
              $containsi: query,
            },
          },
          populate: ["product_image", "hoverimage", "VariantProduct"],        
      });

      setResults(res.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Offcanvas */}
      <div
        className={`fixed top-0 right-0 h-full overflow-y-scroll p-2 w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isSearchOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Search Products</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className=" p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter product name..."
              className="flex-1 px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className=" px-1 text-[15px] font-semibold bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700"
            >
              <SearchIcon />
            </button>
          </form>

          {/* Results */}
          <div className="mt-4 space-y-2">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : results.length > 0 ? (
              results.map((p) => (
                <div key={p.id} className="border-b pb-2">
                 <ProductCard key={p.id} item={p} viewMode="list" className="w-fit" />
              </div>))
            ) : query ? (
              <p className="text-red-500">No products found.</p>
            ) : (
              <p className="text-gray-400">Type a product name to search.</p>
            )}
          </div>
        </div>
      </div>

      
      {/* Overlay */}
      {isSearchOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40"
        />
      )}
    </>
  );
}
