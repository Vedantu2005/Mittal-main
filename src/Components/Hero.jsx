import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [arrows, setArrows] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);

  // Arrow grid generator - responsive spacing
  const generateArrows = () => {
    const spacing = window.innerWidth < 480 ? 32 : 40; // smaller spacing on mobile
    const width = window.innerWidth;
    const height = window.innerHeight;

    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    const arrowList = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arrowList.push({
          x: c * spacing,
          y: r * spacing,
          baseColor: Math.random() < 0.1 ? "#FF8C1E" : "#FFFFFF",
        });
      }
    }

    setArrows(arrowList);
  };

  useEffect(() => {
    generateArrows();
    window.addEventListener("resize", generateArrows);
    return () => window.removeEventListener("resize", generateArrows);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setMousePos(pos);

      const nearest = arrows
        .map((a, index) => ({
          index,
          d: Math.hypot(pos.x - a.x, pos.y - a.y),
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 4)
        .map((obj) => obj.index);

      setActiveIndexes(nearest);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [arrows]);

  return (
    <div
      ref={containerRef}
      className="
        relative bg-black/90 text-white 
        min-h-screen overflow-hidden 
        font-[Borna], Trebuchet MS, sans-serif 
        cursor-pointer
        px-4 sm:px-6 md:px-10
      ">
      {/* MARQUEE */}
      <div className="bg-[#FF8C1E] py-1.5 overflow-hidden whitespace-nowrap rounded-xl m-2 uppercase">
        <div className="animate-marquee marquee-text text-sm sm:text-base">
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
          <span className="inline-block px-3 sm:px-4">
            “We”, A Global Branding Company based out of USA, UK , INDIA
          </span>
        </div>
      </div>

      {/* ARROWS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mt-10 sm:mt-15">
        <div className="relative w-full h-full">
          {arrows.map((arrow, i) => {
            const isActive = activeIndexes.includes(i);

            return (
              <svg
                key={i}
                className={`
                  absolute w-2.5 h-2.5 sm:w-3 sm:h-3 
                  transition-all duration-300 
                  ${isActive ? "scale-[1.35] opacity-100" : "opacity-50"}
                `}
                style={{
                  left: arrow.x,
                  top: arrow.y,
                  fill: isActive ? "#FF8C1E" : arrow.baseColor,
                  transition: "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)",
                }}
                viewBox="0 0 6 9">
                <path d="M5.418 3.491C3.145 3.154 1.495 1.719 1.002 0H0v8.115h1.002C1.504 6.395 3.146 4.961 5.419 4.624V3.491z" />
              </svg>
            );
          })}
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[calc(100vh-84px)]">
        <div className="mt-10 sm:mt-16 self-start">
          <h1
            className="
            text-4xl sm:text-5xl md:text-7xl 
            font-normal leading-snug sm:leading-tight fade-down fade-delay-1
          ">
            Your brand’s right. <br />
            Is your{" "}
            <em className="italic font-semibold italic-text">partner?</em>
          </h1>
        </div>

        <div
          className="
          flex flex-col md:flex-row 
          justify-between items-start 
          mt-16 sm:mt-24 md:mt-32 
          pb-10 sm:pb-16
        ">
          <p
            className="
            text-xl sm:text-2xl 
            mt-6 sm:mt-10 
            font-semibold 
            max-w-xl 
            mb-8 md:mb-0 
            fade-down fade-delay-2
            leading-relaxed
          ">
            One time fee. Lifetime partnership. We don’t just build brands — we
            build value that lasts. The world’s first personal branding
            incubator.
          </p>

          <Link to="/how-it-works">
            <h2
              className="
      text-4xl sm:text-5xl md:text-7xl 
      font-medium text-right 
      leading-snug sm:leading-tight 
      fade-down fade-delay-3
      mt-10 md:mt-0
      cursor-pointer transition-opacity duration-300 hover:opacity-80
    ">
              How it’s <br />
              <em className="italic font-normal italic-text">possible?</em>
            </h2>
          </Link>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .italic-text {
          font-family: "Bw Beto Grande", Georgia, sans-serif !important;
          font-style: italic;
          font-weight: 500;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        .marquee-text {
          font-family: Borna, "Trebuchet MS", sans-serif;
          letter-spacing: 0.7px;
          color: black;
          font-weight: 400;
        }

        @keyframes fadeDown {
          0% {
            opacity: 0;
            transform: translateY(-25px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-down {
          animation: fadeDown 1s ease-out forwards;
        }
        .fade-delay-1 {
          animation-delay: 0.3s;
        }
        .fade-delay-2 {
          animation-delay: 0.6s;
        }
        .fade-delay-3 {
          animation-delay: 0.9s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
