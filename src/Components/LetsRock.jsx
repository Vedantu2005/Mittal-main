import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Scroll Animation Hook ---
const useScrollAnimate = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => {
      if (ref.current) obs.unobserve(ref.current);
    };
  }, []);

  return [ref, visible];
};

// --- Animation Wrapper ---
const AnimatedBlock = ({ children }) => {
  const [ref, visible] = useScrollAnimate();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
    >
      {children}
    </div>
  );
};

// --- Horizontal Line Hook ---
const useHorizontalLineAnimation = (lineRef) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const element = lineRef.current;
    if (!element) return;

    let active = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (!active) setLineWidth(0);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    const onScroll = () => {
      if (!active) return;

      const { top, height } = element.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh;
      const end = -height;
      const total = start - end;

      const progress = start - top;

      let pct = 0;
      if (progress > 0)
        pct = Math.min(1, Math.max(0, progress / total));

      setLineWidth(pct * 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.unobserve(element);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lineRef]);

  return lineWidth;
};

// --- Icons ---
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

const CircularArrowButton = () => (
  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:h-8 md:w-8 text-white transform -rotate-45 transition-all group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

// --- Main Component ---
const LetsRock = () => {
  const navigate = useNavigate();
  const lineRef = useRef(null);
  const lineWidth = useHorizontalLineAnimation(lineRef);

  return (
    <section className="bg-black/90 text-white overflow-hidden">

      {/* SECTION 1 */}
      <div className="w-full mx-auto py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 px-6">

        {/* LEFT BLOCK */}
        <AnimatedBlock>
          <div className="lg:col-span-1">
            <p className="text-xl sm:text-2xl font-normal leading-relaxed max-w-xl">
              Every day, 50 new ideas shape how we think, build, and grow.
              That’s over 18,000 sparks of innovation — every single year.
            </p>
          </div>
        </AnimatedBlock>

        {/* RIGHT BLOCK */}
        <AnimatedBlock>
          <div className="lg:col-span-1 mt-10 md:mt-32 text-left flex flex-col items-start">

            <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-lg">
              Every expert was once a student. <br />
              Every brand — a learner before a leader.
            </p>

            {/* CLICKABLE CTA ROUTE TO /legacy */}
            <div
              className="flex items-center space-x-3 sm:space-x-4 mt-6 md:mt-12 group cursor-pointer"
              onClick={() => navigate("/legacy")}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif transition group-hover:italic group-hover:underline">
                How we became what we are
              </p>
              <CircularArrowButton />
            </div>
          </div>
        </AnimatedBlock>

      </div>

      {/* SCROLL LINE */}
      <div className="max-w-[1500px] mx-auto px-6 h-px relative overflow-hidden" ref={lineRef}>
        <div
          className="absolute top-0 left-0 h-px bg-white"
          style={{ width: `${lineWidth}%` }}
        />
      </div>

      {/* SECTION 2 */}
      <AnimatedBlock>
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-center">

          <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 mb-8 md:mb-12">
            <ArrowIcon />
            <p className="text-lg sm:text-xl md:text-3xl font-light leading-relaxed max-w-2xl">
              We work with leaders and visionaries who see beyond the ordinary.
              Those who dream in decades, not deadlines. Together, we build brands
              that shape culture.
            </p>
            <ArrowIcon className="rotate-180" />
          </div>

          {/* CLICK → /community */}
          <h2
            onClick={() => navigate("/community")}
            className="text-4xl sm:text-5xl md:text-7xl font-serif italic leading-tight cursor-pointer transition hover:underline"
          >
            See Our Missions
          </h2>

        </div>
      </AnimatedBlock>

    </section>
  );
};

export default LetsRock;
