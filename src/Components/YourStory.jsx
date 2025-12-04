// src/components/YourStory.jsx
import React, { useEffect, useState } from "react";

const CircularArrowButton = () => (
  <div className="
      flex items-center justify-center 
      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
      rounded-full border border-white 
      transition-all duration-300 ease-in-out
      group-hover:border-white
    ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white transition-transform duration-500 transform -rotate-45 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

const YourStory = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-black/90 text-white min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="relative w-full max-w-[1400px] rounded-2xl overflow-hidden p-6 sm:p-10 md:p-12">

        {/* === BORDER ANIMATION === */}
        <style jsx>{`
          .border-animated-box {
            position: absolute;
            inset: 0;
            border-radius: 20px;
          }
          .border-animated-box::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 20px;
            border: 2px solid white;
            clip-path: inset(0 100% 0 0);
            animation: revealBorder 1.6s ease-out forwards;
          }
          @keyframes revealBorder {
            0% { clip-path: inset(0 100% 0 0); }
            25% { clip-path: inset(0 0 100% 0); }
            50% { clip-path: inset(0 0 0 100%); }
            100% { clip-path: inset(0 0 0 0); }
          }
        `}</style>

        <div className="border-animated-box"></div>

        {/* === CONTENT GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 py-6 sm:py-10 relative z-10">

          {/* LEFT SECTION */}
          <div>
            <p
              className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 text-gray-300 font-light"
              style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
            >
              Working as a friend — not a service provider
            </p>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug"
              style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
            >
              No time to figure out <br /> the right way to <br /> tell your story?
            </h1>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col justify-between space-y-6 sm:space-y-8 lg:mt-40">
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200"
              style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
            >
              Busy with your career and can’t afford workshops? Need someone to handle your brand
              strategy while you focus on what you do best? If ease and personal attention aren’t
              your priorities, this might not be for you.
            </p>

            {/* CTA BUTTON */}
            <button
              onClick={() =>
                document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer"
            >
              <p
                className="text-lg sm:text-xl text-left md:text-2xl lg:text-3xl font-normal leading-snug group-hover:italic group-hover:underline"
                style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}
              >
                Carefully customized strategies <br /> for your personal stories.
                <br />
                <span
                  className="font-semibold italic"
                  style={{
                    fontFamily: "Bw Beto Grande, Georgia, sans-serif",
                  }}
                >
                  We’ve got you covered.
                </span>
              </p>

              <CircularArrowButton />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default YourStory;
