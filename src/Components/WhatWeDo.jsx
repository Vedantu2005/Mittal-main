// src/components/WhatWeDo.jsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
const HomeBMin = "/founder.png";

const CornerPointer = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 6 9"
    className={`text-orange-400 ${className}`}>
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    />
  </svg>
);

const WhatWeDo = () => {
  const navigate = useNavigate();
  const animatedRefs = useRef([]);
  const lineRef = useRef(null);

  const [lineWidth, setLineWidth] = useState(0);

  // Scroll animation
  useEffect(() => {
    const onScroll = () => {
      if (!lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight;
      const end = -150;

      const scrollDistance = start - end;
      const scrolledPastStart = start - rect.top;

      let progress = Math.min(
        1,
        Math.max(0, scrolledPastStart / scrollDistance)
      );

      setLineWidth(progress * 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-slide-visible");
          }
        }),
      { threshold: 0.3 }
    );

    animatedRefs.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <section className="relative bg-black/90 text-white py-14 overflow-hidden main-font">
      {/* FLAG MARQUEE */}
      <div className="w-full overflow-hidden py-6 ">
        <div className="flag-marquee">
          <div className="marquee-track">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center px-3 gap-6">
                {/* India + Neighboring Countries */}
                <img
                  src="https://flagcdn.com/in.svg"
                  className="w-10 h-6"
                />{" "}
                {/* India */}
                <img
                  src="https://flagcdn.com/bd.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Bangladesh */}
                <img
                  src="https://flagcdn.com/np.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Nepal */}
                <img
                  src="https://flagcdn.com/bt.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Bhutan */}
                <img
                  src="https://flagcdn.com/lk.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Sri Lanka */}
                <img
                  src="https://flagcdn.com/mm.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Myanmar */}
                <img
                  src="https://flagcdn.com/cn.svg"
                  className="w-10 h-6"
                />{" "}
                {/* China */}
                <img
                  src="https://flagcdn.com/af.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Afghanistan */}
                {/* Other Global Flags */}
                <img
                  src="https://flagcdn.com/us.svg"
                  className="w-10 h-6"
                />{" "}
                {/* USA */}
                <img
                  src="https://flagcdn.com/gb.svg"
                  className="w-10 h-6"
                />{" "}
                {/* UK */}
                <img
                  src="https://flagcdn.com/ca.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Canada */}
                <img
                  src="https://flagcdn.com/au.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Australia */}
                <img
                  src="https://flagcdn.com/sg.svg"
                  className="w-10 h-6"
                />{" "}
                {/* Singapore */}
                <img
                  src="https://flagcdn.com/ae.svg"
                  className="w-10 h-6"
                />
                {/* UAE */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        className="
          max-w-[1400px] mx-auto px-4 
          grid grid-cols-1 
          lg:grid-cols-[0.7fr_1.3fr] 
          gap-10 md:gap-14 
          mt-10
        ">
        {/* LEFT IMAGE */}
        <div
          ref={(el) => (animatedRefs.current[0] = el)}
          className="
            fade-slide 
            flex justify-center lg:justify-start 
            ml-0 lg:ml-20 
            mb-10 lg:mb-0
          ">
          <div
            className="
              relative p-4 rounded-2xl 
              w-full max-w-[380px] 
              mx-auto
              -ml-0 md:-ml-16 lg:-ml-24
            ">
            <CornerPointer className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
            <CornerPointer className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-180" />
            <CornerPointer className="absolute bottom-0 left-[45%] translate-x-1/2 translate-y-1/2 rotate-270" />
            <CornerPointer className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-0" />

            <img
              src={HomeBMin}
              className="rounded-xl w-full object-cover shadow-xl"
              style={{ minHeight: "360px", maxHeight: "430px" }}
              alt="Founder"
            />
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="grid mt- lg:mt-30 grid-cols-1 md:grid-cols-2 gap-14">
          {/* BLOCK 1 */}
          <div
            ref={(el) => (animatedRefs.current[1] = el)}
            className="fade-slide">
            <h3 className="text-lg md:text-xl font-light mb-2">What we do?</h3>

            <h2 className="text-2xl md:text-3xl font-light leading-snug mb-3">
              A lifelong brand-building experience partner
            </h2>

            <p className="text-base md:text-lg font-light leading-relaxed">
              We help leaders grow into world-class brands with long-term value,
              strategic clarity and identity that evolves for life.
            </p>
          </div>

          {/* BLOCK 2 */}
          <div
            ref={(el) => (animatedRefs.current[2] = el)}
            className="fade-slide">
            <h3 className="text-lg md:text-xl font-light mb-2">
              How we do it?
            </h3>

            <h2 className="text-2xl md:text-3xl font-light leading-snug mb-3">
              Global strategy × Local impact
            </h2>

            <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed">
              Using our 5-pillar system and a global network across USA, UK &
              India — your growth is engineered for worldwide influence.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        ref={(el) => (animatedRefs.current[3] = el)}
        onClick={() => navigate("/how-it-works")}
        className="
          fade-slide relative z-10 
          max-w-[1400px] mx-auto px-4 
          mt-20 
          flex flex-col sm:flex-row 
          sm:justify-end justify-center 
          items-center gap-6 
          group cursor-pointer
        ">
        <h2
          className="
    text-2xl md:text-4xl font-light text-center sm:text-right
    hover-underline hover:italic transition-all duration-300
  ">
          How <span className="brand-italic">Brand</span> Incubator{" "}
          <span className="brand-italic">Work</span>?
        </h2>

        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white group-hover:border-white transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 sm:h-8 sm:w-8 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500"
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
      </div>

      {/* SCROLL LINE */}
      <div className="max-w-[1600px] mx-auto px-4 mt-16 sm:mt-20">
        <div
          ref={lineRef}
          className="w-full h-px bg-none relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-px bg-white"
            style={{
              width: `${lineWidth}%`,
              transition: "width 0.65s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}></div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .brand-italic {
          font-family: "Bw Beto Grande", Georgia, sans-serif !important;
          font-style: italic !important;
          font-weight: 500 !important;
        }

        .main-font {
          font-family: Borna, "Trebuchet MS", sans-serif !important;
        }

        .fade-slide {
          opacity: 0;
          transform: translateY(-25px);
          transition: all 0.8s ease-out;
        }

        .fade-slide-visible {
          opacity: 1 !important;
          transform: translateY(0px) !important;
        }

        .flag-marquee {
          width: 100%;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
        }
        .hover-underline {
          position: relative;
          display: inline-block;
        }

        .hover-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 1px;
          background: white;
          transition: width 0.35s ease;
        }

        .hover-underline:hover::after {
          width: 100%;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;
