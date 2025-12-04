// src/components/Workshops.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Intersection Observer Hook
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Arrow Icon
const ArrowIcon = ({ className = '', style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 
      w-2.5 h-2.5
      sm:w-3.5 sm:h-3.5
      md:w-5 md:h-5
      ${className}`}
    style={style}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

// Fixed Arrow Positions
const getStaticArrowPositions = () => [
  { top: '20%', left: '30%', transform: 'translate(-50%, -50%) rotate(45deg)' },
  { top: '20%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' },
  { top: '20%', left: '70%', transform: 'translate(-50%, -50%) rotate(135deg)' },

  { top: '50%', left: '30%', transform: 'translate(-50%, -50%) rotate(0deg)' },
  { top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(270deg)' },
  { top: '50%', left: '70%', transform: 'translate(-50%, -50%) rotate(180deg)' },

  { top: '80%', left: '30%', transform: 'translate(-50%, -50%) rotate(315deg)' },
  { top: '80%', left: '50%', transform: 'translate(-50%, -50%) rotate(270deg)' },
  { top: '80%', left: '70%', transform: 'translate(-50%, -50%) rotate(235deg)' },
];

// Card Component (Clickable)
const WorkshopCard = ({ title, onClick }) => {
  const arrowPositions = getStaticArrowPositions();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="
        relative p-[2px] rounded-3xl group cursor-pointer
        w-full 
        h-[320px]   
        sm:h-[380px]   
        md:h-[460px]   
      "
    >
      {/* Border Animation */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden z-0">
        <div
          className={`absolute inset-0 border-gradient-animation rounded-[inherit] ${
            isVisible ? 'animate-border-pulse' : ''
          }`}
        ></div>
      </div>

      {/* Inner Content */}
      <div
        className="
          relative z-10 bg-black rounded-[calc(1.5rem-2px)]
          h-full w-full 
          p-4 sm:p-6 md:p-8
          flex flex-col justify-between
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal group-hover:italic group-hover:underline transition-all">
            {title}
          </h3>

          <div className="flex items-center justify-center 
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
            rounded-full border border-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white transform -rotate-45 group-hover:rotate-0 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Arrow Grid */}
        <div className="relative flex-grow">
          {arrowPositions.map((pos, index) => (
            <ArrowIcon key={index} className="absolute" style={pos} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Workshops Component
const Workshops = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black/90 text-white py-10 sm:py-14 md:py-20 w-full">
      <style>{`
        @keyframes border-pulse {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .border-gradient-animation {
          background: linear-gradient(to bottom, #333 0%, #333 50%, #fff 50%, #fff 100%);
          background-size: 100% 200%;
        }
        .animate-border-pulse {
          animation: border-pulse 1s forwards;
        }
      `}</style>

      {/* Header */}
      <div className="w-full px-4 sm:px-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-14 md:mb-20 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal w-full">
            Explore the Personal Branding Incubator
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

          {/* Card 1 → /brand-incubator */}
          <WorkshopCard
            title={<>How it<br />Works</>}
            onClick={() => navigate("/how-it-works")}
          />

          {/* Card 2 → scroll to #footer */}
          <WorkshopCard
            title={<>Why we are<br />Different</>}
            onClick={() => navigate("/what-makes-us-different")}
          />

          {/* Card 3 → /community */}
          <WorkshopCard
            title={<>Explore our<br />Community</>}
            onClick={() => navigate("/community")}
          />

        </div>
      </div>
    </section>
  );
};

export default Workshops;
