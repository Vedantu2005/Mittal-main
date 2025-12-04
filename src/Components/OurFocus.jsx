import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Reusable hook for scroll-into-view animation ---
const useScrollAnimate = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, visible];
};

// SVG
const ArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 9"
    className={`text-orange-400 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${className}`}
  >
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    />
  </svg>
);

const CircularArrowButton = () => (
  <div
    className="flex items-center justify-center 
    w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16
    rounded-full border border-black 
    transition-all duration-300 group-hover:border-black"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-black transform -rotate-45 group-hover:rotate-0 transition-all duration-300"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

// Data
const focusPoints = [
  {
    title: "Discover your DNA",
    description: "Uncover what makes your brand truly unforgettable.",
  },
  {
    title: "Design your growth",
    description: "Align your identity, vision, and business into one seamless story.",
  },
  {
    title: "Evolve endlessly",
    description: "Join a lifetime ecosystem built to grow with you.",
  },
];

// MAIN COMPONENT
const OurFocus = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black/90 text-white overflow-hidden">

      {/* TOP SECTION */}
      <div className="w-full py-10 sm:py-14 md:py-24 flex flex-col lg:flex-row gap-10 px-4 md:px-0 ml-4">

        {/* LEFT TEXT */}
        <AnimatedBlock>
          <div className="w-full lg:w-[85%]">
            <h1 className="text-xl sm:text-2xl md:text-2xl font-normal leading-snug max-w-xl">
              We don’t follow trends — we create blueprints.
              Our incubation model blends strategy, psychology, and storytelling
              to build personal brands that never fade — they evolve.
            </h1>
          </div>
        </AnimatedBlock>

        {/* RIGHT ANIMATED POINTS */}
        <div className="w-full lg:w-[45%] space-y-6 md:space-y-8 pr-6 md:pr-20">
          {focusPoints.map((point, index) => (
            <AnimatedBlock key={index}>
              <div className="flex items-start space-x-3">
                <div className="flex items-center space-x-1 pt-1">
                  <ArrowIcon />
                  <span className="text-white font-bold text-base sm:text-lg">
                    {index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-light">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base font-light text-gray-200">
                    {point.description}
                  </p>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>
      </div>

      {/* ORANGE CTA BLOCK */}
      <AnimatedBlock>
        <div
          className="text-black py-8 md:py-16 px-4 rounded-2xl mx-4"
          style={{ backgroundColor: "#FF8C1E", maxWidth: "93rem" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col">

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-normal leading-tight mb-10">
              Stop watching others take your spotlight. Brands are already enrolling —
              your seat in the incubator is waiting.
            </h2>

            {/* CLICKABLE CTA */}
            <div
              onClick={() => navigate("/community")}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <p
                className="
                  text-2xl sm:text-3xl md:text-4xl font-serif 
                  transition-all 
                  group-hover:underline group-hover:italic
                "
              >
                Join the <br />
                <span className="italic font-bold">incubator</span>
              </p>

              <CircularArrowButton />
            </div>
          </div>
        </div>
      </AnimatedBlock>

      {/* BOTTOM TWO-COLUMN SECTION */}
      <div className="w-full py-12 sm:py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[90rem] mx-auto px-4">

        <AnimatedBlock>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Building with <br /> Brandpreneurial Spirit
            </h2>
          </div>
        </AnimatedBlock>

        <AnimatedBlock>
          <div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-normal leading-normal">
              Being multinational means we’ve <br />
              seen the world from every angle. <br />
              We understand this{" "}
              <span className="italic font-semibold">
                business <br /> down to its finest detail.
              </span>
            </p>
          </div>
        </AnimatedBlock>

      </div>
    </section>
  );
};

// Animated wrapper
const AnimatedBlock = ({ children }) => {
  const [ref, visible] = useScrollAnimate();

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      `}
    >
      {children}
    </div>
  );
};

export default OurFocus;
