import React, { useEffect, useState } from "react";

export default function ScrollToTopWithProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6  w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md hover:shadow-lg transition-all"
      style={{ zIndex: 1000 }}
    >
      {/* Progress circle */}
      <svg
        className="absolute top-0 left-0 w-12 h-12 -rotate-90"
        viewBox="0 0 36 36"
      >
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="2"
        />
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#4B8063"
          strokeWidth="2"
          strokeDasharray={`${scrollPercent}, 100`}
        />
      </svg>

      {/* Real SVG Arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-5 h-5 text-[#4B8063]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
