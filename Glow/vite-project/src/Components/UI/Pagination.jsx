import React from "react";
import { usePaginationStore } from "../../Store/Store";

export default function Pagination({ totalPages }) {
  const { currentPage, setCurrentPage } = usePaginationStore();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
      {/* Prev button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="text-black opacity-75  hover:bg-[#F5F5F5]  rounded-full text-xs sm:text-sm p-2 sm:p-3 disabled:opacity-0"
      >
        <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 L12 12 L18 18" />
                <path d="M12 6 L6 12 L12 18" />
              </svg>
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold flex items-center justify-center text-xs sm:text-sm ${
            currentPage === i + 1
              ? "bg-[#F5F5F5] text-black opacity-75 cursor-default"
              : "text-black hover:bg-[#F5F5F5]"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="text-black hover:bg-[#F5F5F5] rounded-full text-xs sm:text-sm p-2 sm:p-3 disabled:opacity-0"
      >
           <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6 L12 12 L6 18" />
                <path d="M12 6 L18 12 L12 18" />
              </svg>
      </button>
    </div>
  );
}
