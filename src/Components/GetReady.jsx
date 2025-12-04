import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ REQUIRED FOR ROUTING

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

// SVG component
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

// Circle Arrow
const CircularArrowButton = () => (
  <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-white transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 md:h-8 md:w-8 text-white transform -rotate-45 transition-transform duration-500 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

const GetReady = () => {
  const navigate = useNavigate(); // ✅ NOW ENABLED
  const lineRef = useRef(null);
  const lineWidth = useHorizontalLineAnimation(lineRef);

  return (
    <section className="bg-black/90 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 mt-10 flex flex-col items-center justify-center text-center">

        {/* Text + Arrows */}
        <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-8 md:mb-12">
          <ArrowIcon />
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl">
            I’ll help you turn what seems extremely
            <br />
            ‘difficult’ into something so ‘simple’, you’ll
            <br />
            wonder why you didn’t see it before.
          </p>
          <ArrowIcon className="transform rotate-180" />
        </div>

        {/* CTA BUTTON — NOW ROUTED */}
        <div className="lg:col-span-1 flex flex-col items-start lg:items-end text-left pt-1">
          <button
            onClick={() => {
              window.open(
                "https://calendar.app.google/7NKe1NBEGwAHouVcA",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="flex items-center space-x-4 group cursor-pointer"
          >
            <p className="text-3xl md:text-4xl font-normal leading-tight font-serif transition group-hover:italic group-hover:underline">
              Book a Call
            </p>

            <CircularArrowButton />
          </button>
        </div>

      </div>
    </section>
  );
};

export default GetReady;
