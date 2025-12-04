import React, { useEffect, useRef, useState } from "react";

// Black circular arrow button
const CircularArrowButton = () => (
  <div
    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14
               rounded-full border border-black transition-all duration-300 ease-in-out hover:scale-105 bg-[#FF8C1A]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:h-7 md:w-7 text-black transition-transform duration-500 ease-in-out transform -rotate-45 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
);

// Smooth slide-down hook
const useSlideDown = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const WeGotThis = () => {
  const [refLeft, leftVisible] = useSlideDown();
  const [refRight, rightVisible] = useSlideDown();
  const [refCTA, ctaVisible] = useSlideDown();

  return (
    <section className="bg-black/90 flex justify-center items-center py-20 px-6 sm:px-10 md:px-12 lxg:px-20">
      <div className="bg-[#FF8C1A] text-black w-full rounded-[1rem] px-16 sm:px-22 md:px-30 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* LEFT SECTION (Animated) */}
          <div
            ref={refLeft}
            className={`transition-all duration-700 ease-out transform
            ${
              leftVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
            }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug">
              We’ve Got This. <br />
              We Will Do It <span className="italic font-serif">For You.</span>
            </h2>
          </div>

          {/* RIGHT SECTION (Animated) */}
          <div
            ref={refRight}
            className={`flex flex-col justify-center space-y-6 text-left transition-all duration-700 ease-out transform
            ${
              rightVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
            }`}>
            <h3 className="text-xl md:text-2xl font-medium leading-snug">
              We take the burden off your shoulders. <br />
              We take care of everything{" "}
              <span className="italic">‘brand strategy.’</span>
            </h3>

            <p className="text-lg md:text-xl text-black/90 leading-relaxed max-w-xl">
              Our 1:1 sessions are designed to bring you comfort and ease while
              we do the heavy lifting. Whether it’s brand strategy, messaging,
              or positioning, we cover it all with your goals in mind.
            </p>
          </div>
        </div>

        {/* CTA BUTTON (Animated) */}
        <div
          ref={refCTA}
          className={`w-full mt-16 flex justify-end transition-all duration-700 ease-out transform
          ${
            ctaVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-12"
          }`}>
          <button
            onClick={() => {
              window.open(
                "https://calendar.app.google/7NKe1NBEGwAHouVcA",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="flex items-center space-x-4 group cursor-pointer focus:outline-none">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif transition-all duration-300 ease-in-out group-hover:italic group-hover:underline text-left">
              Book a Call
            </p>
            <CircularArrowButton />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WeGotThis;
