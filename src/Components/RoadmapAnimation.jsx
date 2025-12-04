import React, { useEffect, useState } from "react";

const roadmapSteps = [
  {
    label: "Brand Structure",
    icon: "/egg.png",
    description:
      "Just like a hen nurtures an egg until it hatches, we structure your brand from idea → identity.",
  },
  {
    label: "Brand Launch",
    icon: "/broken-egg.png",
    description:
      "The moment your brand hatches — ready to step into the world with clarity and confidence.",
  },
  {
    label: "Brand Nurturing",
    icon: "/hen.png",
    description:
      "We stay as lifelong partners — nurturing, guiding, and evolving your brand continuously.",
  },
];

const Arrow = ({ className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
    className={className}
    style={style}
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const RoadmapAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [arrowProgress, setArrowProgress] = useState(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("roadmap-section");
      if (!section) return;

      const triggerHeight = window.innerHeight * 0.4;
      const scrollTop = window.scrollY;
      const offsetTop = section.offsetTop;
      const height = section.clientHeight;

      const progress = scrollTop - offsetTop + triggerHeight;
      let percentage = Math.min(Math.max(progress / height, 0), 1);

      setArrowProgress(percentage);

      const stepIndex = Math.floor(percentage * roadmapSteps.length);
      setCurrentStep(stepIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="roadmap-section"
      className="bg-black/90 text-white py-24 px-6 relative"
    >
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-20">
      </h2>

      {/* ------------------ DESKTOP ------------------ */}
      {!isMobile && (
        <div className="relative max-w-6xl mx-auto">

          {/* Base Line */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-white/20"></div>

          {/* Arrow Fill Line */}
          <div
            className="absolute top-1/2 h-[3px] bg-white transition-all duration-500 ease-out"
            style={{ width: `${arrowProgress * 100}%` }}
          ></div>

          {/* Arrow Head */}
          <Arrow
            className="absolute -top-[13px] transition-all duration-500 ease-out"
            style={{
              left: `calc(${arrowProgress * 100}% - 15px)`,
            }}
          />

          <div className="grid grid-cols-3 text-center">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative"
              >
                {/* Icon */}
                <div
                  className={`w-28 h-28 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-xl transition-all duration-700 ease-out
                    ${
                      currentStep >= index
                        ? "opacity-100 scale-100"
                        : "opacity-30 scale-75"
                    }`}
                >
                  <img src={step.icon} className="w-16 h-16" />
                </div>

                {/* Dotted Line */}
                <div className="h-10 border-l-2 border-dotted border-white mt-3"></div>

                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg">
                  0{index + 1}
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-semibold mt-4 transition-all duration-700 ease-out
                    ${currentStep >= index ? "opacity-100" : "opacity-40"}
                  `}
                >
                  {step.label}
                </h3>

                {/* Description */}
                <p
                  className={`text-gray-300 text-sm mt-3 max-w-xs transition-all duration-700 ease-out
                    ${currentStep >= index ? "opacity-100" : "opacity-0 translate-y-2"}
                  `}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------ MOBILE ------------------ */}
      {isMobile && (
        <div className="relative max-w-sm mb-20 mx-auto h-[650px]">

          {/* Background Line (BELOW all content) */}
          <div className="absolute left-1/2 top-0 w-[3px] h-full bg-white/20 -z-10"></div>

          {/* Arrow Fill Line */}
          <div
            className="absolute left-1/2 w-[3px] bg-white transition-all duration-700 ease-out -z-10"
            style={{ height: `${arrowProgress * 100}%` }}
          ></div>

          {/* Arrow Head */}
          <Arrow
            className="absolute left-1/2 rotate-90 -ml-[13px] z-20 transition-all duration-700 ease-out"
            style={{
              top: `calc(${arrowProgress * 100}% - 15px)`,
            }}
          />

          {/* Steps */}
          {roadmapSteps.map((step, index) => (
            <div
              key={index}
              className="absolute flex flex-col items-center w-full z-10"
              style={{
                top: `${(index / (roadmapSteps.length - 1)) * 95}%`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {/* Icon */}
              <div
                className={`w-24 h-24 rounded-full border-4 border-white bg-black flex items-center justify-center transition-all duration-700 ease-out
                  ${
                    currentStep >= index
                      ? "opacity-100 scale-100"
                      : "opacity-30 scale-75"
                  }`}
              >
                <img src={step.icon} className="w-14 h-14" />
              </div>

              {/* Step Number */}
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm mt-3">
                0{index + 1}
              </div>

              {/* Title */}
              <h3
                className={`text-lg font-semibold mt-3 transition-all duration-700 ease-out 
                  ${currentStep >= index ? "opacity-100" : "opacity-40"}
                `}
              >
                {step.label}
              </h3>

              {/* Description */}
              <p
                className={`text-gray-300 text-sm mt-2 text-center max-w-xs transition-all duration-700 ease-out
                  ${
                    currentStep >= index
                      ? "opacity-100"
                      : "opacity-0 translate-y-2"
                  }
                `}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoadmapAnimation;
