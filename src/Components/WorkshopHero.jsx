// src/components/WorkshopHero.jsx

import React, { useState, useEffect, useRef } from "react";

const WorkshopHero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [arrows, setArrows] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState([]);

  const generateArrows = () => {
    const spacing = 40;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    const list = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          x: c * spacing,
          y: r * spacing,
          baseColor: Math.random() < 0.1 ? "#FF8C1E" : "#fff",
        });
      }
    }
    setArrows(list);
  };

  useEffect(() => {
    generateArrows();
    window.addEventListener("resize", generateArrows);
    return () => window.removeEventListener("resize", generateArrows);
  }, []);

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
    <section
      ref={containerRef}
      className="relative bg-black/90 text-white min-h-screen pt-20 pb-10 overflow-hidden cursor-pointer"
    >
      {/* Background arrows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="relative w-full h-full">
          {arrows.map((arrow, i) => {
            const isActive = activeIndexes.includes(i);
            return (
              <svg
                key={i}
                className={`absolute w-3 h-3 transition-all duration-500 ${
                  isActive
                    ? "scale-[1.25] opacity-100 drop-shadow-[0_0_8px_#FF8C1E]"
                    : "opacity-60"
                }`}
                style={{
                  left: arrow.x,
                  top: arrow.y,
                  fill: isActive ? "#FF8C1E" : arrow.baseColor,
                }}
                viewBox="0 0 6 9"
              >
                <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
              </svg>
            );
          })}
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-full mx-auto px-6 sm:px-12 lg:px-24 min-h-[90vh]">

        {/* LEFT CONTENT + RIGHT CIRCLE INLINE */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">

          {/* LEFT HEADING + SUBTEXT */}
          <div className="lg:w-1/2">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight mb-8 ml-10"
              style={{
                fontFamily: "Borna, Trebuchet MS, sans-serif",
                lineHeight: "150%",
              }}
            >
              Personal <br />
              <span
                style={{
                  fontFamily: "Bw Beto Grande, Georgia, sans-serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                Brand <br /> Incubator
              </span>
            </h1>

            <p
              className="ml-10 lg:mt-25"
              style={{
                fontFamily: "Borna, Trebuchet MS, sans-serif",
                fontSize: "1.8rem",
                lineHeight: "150%",
              }}
            >
              We don’t serve brands — we grow with <br /> them,
              That’s how Brand Incubator works.
            </p>
          </div>

          {/* RIGHT CIRCLE — properly aligned horizontally */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-80">
            <div className="relative w-56 h-56">

              <div
                className="absolute inset-0"
                style={{ animation: "spin 12s linear infinite" }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="
                        M 150,150
                        m -120,0
                        a 120,120 0 1,1 240,0
                        a 120,120 0 1,1 -240,0
                      "
                    />
                  </defs>

                  <text fill="#ffffff" fontSize="52">
                    <textPath
                      href="#circlePath"
                      startOffset="4%"
                      style={{
                        fontFamily: "Borna, Trebuchet MS, sans-serif",
                      }}
                    >
                      Carve your
                    </textPath>

                    <textPath
                      href="#circlePath"
                      startOffset="40%"
                      style={{
                        fontFamily: "Bw Beto Grande, Georgia, sans-serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                    >
                      vision with us now!
                    </textPath>
                  </text>
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* EXTRA STYLES */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default WorkshopHero;
