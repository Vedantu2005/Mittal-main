// src/components/Missions.jsx
import React, { useEffect, useRef, useState } from "react";

// -------------------------------
// Gold Mission Icon (minimal)
// -------------------------------
const MissionIcon = ({ visible }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF8C1E"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-all duration-[900ms] ${
      visible ? "opacity-100 scale-100" : "opacity-0 scale-50"
    }`}
  >
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

// -------------------------------
// Scroll Reveal Hook (Zoom In)
// -------------------------------
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
};

const Missions = () => {
  const missions = [
    "The Mandala Within is an initiative dedicated to empowering individuals through the Mandala Path—using mandala art as a tool for deep self-discovery and inner alignment. Guided and inspired by Clay Boykin, an exceptional author and thought leader who has devoted years to this work, the initiative helps people reconnect with their identity, purpose, and inner harmony through the wisdom of mandalas.",
    "Based in the UK, Allan Roberts is on a mission to empower youth through thought leadership and a strong, resilient mindset. He believes that mindset shapes everything, and despite facing significant personal challenges with his vision, he remains dedicated to guiding young people toward clarity, confidence, and purpose. His work centers on helping the next generation build the mindset needed to navigate life with strength and direction.",
    "Our next mission comes from Texas, United States, led by Leslie Martinich—one of the most respected consultants in the industry. She is dedicated to helping organizations build through trust and develop true leaders. Through her initiative, Luca.com, she aims not only to shape strong leaders but also to cultivate good human beings. With impactful sessions and engaging animated content, she is committed to empowering young minds and strengthening leadership across corporate America.",
    "Our next initiative comes from Japan, led by Lori Tsugawat, who is dedicated to spreading purpose through the principles of Ikigai and Ganbaru Bushido. She uses these powerful Japanese frameworks to guide and empower millions of individuals, and she extends this mission further through our shared podcast, helping people discover clarity, resilience, and a deeper sense of meaning.",
    "Our next mission comes from India, led by Mr. Mittal, who is committed to empowering 10 million youth and small businesses by 2030. Through impactful talks, mentorship, and continuous guidance, he has already reached over a million students on LinkedIn. He consistently shares internships, opportunities, and resources to help young people grow, build careers, and unlock their true potential.",
  ];

  return (
    <section className="bg-black/90 text-white py-20 px-5 sm:px-10 main-font">

      {/* Header */}
      <div className="max-w-[1100px] mx-auto mb-12">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-light opacity-0 translate-y-6"
          style={{
            animation: "fadeDown 1s ease forwards",
          }}
        >
          Our Top 5
          <br />
          <span className="italic font-serif text-white">Missions</span>
        </h2>
      </div>

      {/* Mission Cards */}
      <div className="max-w-[1100px] mx-auto flex flex-col space-y-10 cursor-pointer">
        {missions.map((item, index) => {
          const [ref, visible] = useScrollReveal();

          return (
            <div
              key={index}
              ref={ref}
              className={`
                w-full p-6 sm:p-8 rounded-xl
                bg-[#0A0A0A]
                border border-[#1e1e1e]
                shadow-[0_0_10px_rgba(0,0,0,0.4)]
                transition-all duration-[900ms] ease-out
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.92]"}
              `}
              style={{ transitionDelay: `${index * 130}ms` }}
            >
              {/* Icon & Number */}
              <div className="flex items-center justify-between mb-4">
                <MissionIcon visible={visible} />

                <span
                  className={`text-xl font-light text-[#FF8C1E] transition-all duration-700 ${
                    visible ? "opacity-70 scale-100" : "opacity-0 scale-50"
                  }`}
                >
                  0{index + 1}
                </span>
              </div>

              {/* Text */}
              <p
                className={`text-sm sm:text-base leading-relaxed text-neutral-300 transition-all duration-700 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {item}
              </p>

              {/* Gold Divider */}
              <div
                className={`
                  mt-5 h-[1.5px] bg-[#FF8C1E]
                  transition-all duration-[1100ms]
                  ${visible ? "w-full" : "w-0"}
                `}
              ></div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Missions;
