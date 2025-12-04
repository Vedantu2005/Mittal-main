import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ REQUIRED

// --- Custom Hook for Scroll-Driven Horizontal Line Animation ---
const useHorizontalLineAnimation = (lineRef) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const lineElement = lineRef.current;

    if (!lineElement) return;

    let isIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (!isIntersecting) setLineWidth(0);
      },
      { threshold: 0.1 }
    );

    observer.observe(lineElement);

    const handleScroll = () => {
      if (!isIntersecting) return;

      const { top, height } = lineElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight;
      const end = -height;
      const total = start - end;

      const progress = start - top;

      let pct = 0;
      if (progress > 0) pct = Math.min(1, Math.max(0, progress / total));

      setLineWidth(pct * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.unobserve(lineElement);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lineRef]);

  return lineWidth;
};

// SVG component (orange arrow)
const ArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 w-4 h-4 md:w-5 md:h-5 ${className}`}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

// Circular arrow button
const CircularArrowButton = () => (
  <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-white group-hover:border-white transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 md:h-8 md:w-8 text-white transform -rotate-45 transition-transform duration-500 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
);

const BeginOtO = () => {
  const navigate = useNavigate(); // ✅ INITIALIZED HERE
  const lineRef = useRef(null);
  const lineWidth = useHorizontalLineAnimation(lineRef);

  return (
    <section className="bg-black/90 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 mt-10 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-8 md:mb-12">
          <ArrowIcon />
          <p className="text-xl md:text-3xl font-light leading-relaxed max-w-4xl">
            Your brand strategy is the story that people tell about
            <br />
            you when you're not in the room.
            <br />
            Be seen, be remembered, be YOU.
          </p>
          <ArrowIcon className="transform rotate-180" />
        </div>

        {/* ROUTED BUTTON */}
        <div className="lg:col-span-1 flex flex-col items-start lg:items-end text-left pt-1">
          <button
            onClick={() => navigate("/community")} // ✅ ROUTING FIXED
            className="flex items-center space-x-4 group cursor-pointer"
          >
            <p
              className="text-2xl md:text-4xl font-normal leading-tight font-serif transition-all duration-300 group-hover:italic group-hover:underline"
            >
              Begin your 1:1 Brand
              <br />
              Strategy Consultation
            </p>

            <CircularArrowButton />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeginOtO;
