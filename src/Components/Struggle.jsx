import React, { useRef, useEffect, useState } from "react";

// --- Custom Hook for Scroll-Driven Horizontal Line Animation ---
const useScrollLineAnimation = (lineRef) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const lineElement = lineRef.current;
    if (!lineElement) return;

    const handleScroll = () => {
      const { top } = lineElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const animationStart = viewportHeight;
      const animationEnd = -100;
      const totalScroll = animationStart - animationEnd;
      const scrolled = animationStart - top;

      let progress = 0;
      if (scrolled > 0)
        progress = Math.min(1, Math.max(0, scrolled / totalScroll));

      setLineWidth(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lineRef]);

  return lineWidth;
};

const Struggle = () => {
  const lineRef = useRef(null);
  const lineWidth = useScrollLineAnimation(lineRef);

  return (
    <section className="bg-black/90 text-white pt-10 px-4 sm:px-6 lg:px-10 main-font">

      {/* Responsive Scroll-Animated Line */}
      <div
        ref={lineRef}
        className="
          w-full lg:w-[1500px] 
          h-px relative mb-16 overflow-hidden
        "
      >
        <div
          className="absolute top-0 left-0 h-px bg-white"
          style={{ width: `${lineWidth}%` }}
        />
      </div>

      {/* MAIN GRID */}
      <div className="
        max-w-full mx-auto 
        grid grid-cols-1 lg:grid-cols-2 
        gap-10 sm:gap-14 lg:gap-20
      ">

        {/* LEFT COLUMN */}
        <div className="lg:pr-10">
          <p
            className="
              text-lg sm:text-xl 
              font-semibold mb-4 
              text-gray-300 leading-relaxed
            "
            style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
          >
            The sleepless nights. The silent battles.
          </p>

          <h1
            className="
              text-2xl sm:text-3xl 
              lg:text-5xl 
              font-semibold leading-snug mb-6
            "
            style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
          >
            Built in silence. Breakthrough in daylight.
          </h1>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:pl-16 pt-2 sm:pt-4">
          <p
            className="
              text-xl sm:text-2xl 
              lg:text-3xl 
              font-normal leading-relaxed mb-6 text-gray-200
            "
            style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
          >
            We know the roadmap to branding success.
          </p>

          <p
            className="
              text-xl sm:text-2xl 
              lg:text-3xl 
              font-normal leading-relaxed text-gray-200
            "
            style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
          >
            And we walk it — quietly, when no one’s watching.
          </p>
        </div>
      </div>

      {/* CTA TEXT */}
      <div className="mt-12 sm:mt-16 text-center lg:text-left">
        <p
          className="
            text-lg sm:text-xl 
            lg:text-2xl 
            font-medium tracking-wide
          "
          style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
        >
          How Brand Incubator Works?
        </p>
      </div>
    </section>
  );
};

export default Struggle;
