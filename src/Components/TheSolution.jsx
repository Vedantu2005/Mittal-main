import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ IMPORT THIS

// Orange curved SVG
const CornerPointer = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 ${className}`}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

// White middle arrow
const MiddleArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto hidden sm:block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Circular arrow button
const CircularArrowButton = () => (
  <div
    className="
      flex items-center justify-center 
      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
      rounded-full border border-white 
      transition-all duration-300
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="
        h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 
        text-white transform -rotate-45 
        transition-transform duration-500 
        group-hover:rotate-0
      "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

// Intersection Observer animation hook
const useSlideDown = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        }),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
};

const TheSolution = () => {
  const navigate = useNavigate(); // ✅ INITIALIZE NAVIGATE

  const [refLeft, leftVisible] = useSlideDown();
  const [refRight, rightVisible] = useSlideDown();
  const [refBottom, bottomVisible] = useSlideDown();

  return (
    <section className="bg-black/90 text-white min-h-screen flex items-center justify-center px-6 sm:px-10 md:px-12 py-16">
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div
          ref={refLeft}
          className={`transition-all duration-700 ease-out transform
          ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
        >
          <p className="text-lg sm:text-xl font-medium text-gray-300 mb-3">
            The Solution
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-5">
            We are always <br /> appreciated for <br /> customer support
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-md">
            Your brand should be as unique as your fingerprint.
            It’s not about being the best. It’s about being the only.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div
          ref={refRight}
          className={`flex flex-col justify-between space-y-14 sm:space-y-20 transition-all duration-700 ease-out transform
          ${rightVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
        >

          {/* TOP ICON SECTION */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-12">

            {/* LEFT PATTERN */}
            <div className="flex flex-col items-center sm:items-start space-y-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <CornerPointer className="rotate-180" />
                <CornerPointer />
                <CornerPointer className="rotate-[235deg]" />
                <CornerPointer className="rotate-270" />
                <CornerPointer className="rotate-[145deg]" />
                <CornerPointer className="rotate-90" />
              </div>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed text-center sm:text-left max-w-xs">
                We dive deep into your personal narrative, crafting a brand strategy that’s uniquely yours.
              </p>
            </div>

            {/* MIDDLE ARROW — HIDDEN ON MOBILE */}
            <MiddleArrow />

            {/* RIGHT PATTERN */}
            <div className="flex flex-col items-center sm:items-start space-y-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <CornerPointer />
                <CornerPointer />
                <CornerPointer />
                <CornerPointer />
                <CornerPointer />
                <CornerPointer />
              </div>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed text-center sm:text-left max-w-xs">
                No templates, no one-size-fits-all—just tailored strategies that resonate with your audience.
              </p>
            </div>

          </div>

          {/* CTA BOTTOM */}
          <div
            ref={refBottom}
            className={`flex flex-col items-center lg:items-end text-left lg:text-left lg:mt-20 transition-all duration-700 transform
            ${bottomVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
          >
            <button
              onClick={() => navigate("/brand-incubator")}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 group cursor-pointer text-left"
            >
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal leading-snug group-hover:italic group-hover:underline"
                style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
              >
                Relax!! Literally, 1:1 consultation <br />
                for your brand strategy will help you
                <br />
                <span
                  className="font-semibold italic"
                  style={{
                    fontFamily: "Bw Beto Grande, Georgia, sans-serif",
                  }}
                >
                  We’ve got you covered
                </span>
              </p>

              <CircularArrowButton />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TheSolution;
