import React, { useEffect, useRef, useState } from "react";

// -----------------------------------------
//  CIRCULAR ARROW BUTTON
// -----------------------------------------
const CircularArrowButton = () => (
  <div
    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14
               rounded-full border border-black transition-all duration-300 ease-in-out hover:scale-105">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:h-7 md:w-7 text-black transition-transform duration-500 transform -rotate-45 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
);

// -----------------------------------------
//  ICONS (same, but auto scales on mobile)
// -----------------------------------------
const iconClass =
  "text-black w-20 h-20 sm:w-20 sm:h-20 max-sm:w-14 max-sm:h-14";

const IconSX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconAIX = () => (
  <svg
    viewBox="0 0 26 26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={iconClass}>
    <rect x="3" y="3" width="20" height="20" rx="3" />
    <path
      d="M10 17 L13 9 L16 17 M11.2 14h3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="18" y1="9" x2="18" y2="17" strokeLinecap="round" />
  </svg>
);

const IconAMX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <path
      d="M4 17l6-6 4 4 6-8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="4" cy="17" r="2" fill="currentColor" />
    <circle cx="10" cy="11" r="2" fill="currentColor" />
    <circle cx="14" cy="15" r="2" fill="currentColor" />
    <circle cx="20" cy="7" r="2" fill="currentColor" />
  </svg>
);

const IconUI = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <rect x="3" y="4" width="18" height="14" rx="3" strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2.2" />
    <circle cx="7" cy="14" r="1.7" fill="currentColor" />
    <circle cx="12" cy="14" r="1.7" fill="currentColor" />
    <circle cx="17" cy="14" r="1.7" fill="currentColor" />
  </svg>
);

const IconUX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <path
      d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 11l4 4" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="11" r="1.7" fill="currentColor" />
  </svg>
);

const IconGEOX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <path
      d="M12 21s-6-7-6-11a6 6 0 1 1 12 0c0 4-6 11-6 11z"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" fill="currentColor" />
  </svg>
);

const IconIDX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
    <path d="M8 6v12M16 6v12M3 12h18" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const IconCX = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={iconClass}>
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
    <path d="M8 10h8M8 14h5" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="14" r="1.7" fill="currentColor" />
  </svg>
);

// -----------------------------------------
//  SINGLE PILLAR ITEM (ANIMATED)
// -----------------------------------------
const PillarItem = ({ pillar, Icon, delay }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setShow(e.isIntersecting)),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-start 
                  max-sm:items-center max-sm:text-center
                  transition-all duration-[900ms]
                  ${
                    show
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-12"
                  }`}
      style={{ transitionDelay: `${delay}s` }}>
      <span className="text-2xl font-bold mb-2">{pillar.id}</span>

      <div
        className={`transition-all duration-[900ms]
                    ${show ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        style={{ transitionDelay: `${delay + 0.2}s` }}>
        <Icon />
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-1">{pillar.title}</h3>
      <p className="text-sm font-light max-w-xs max-sm:text-center">
        {pillar.desc}
      </p>
    </div>
  );
};

// -----------------------------------------
// MAIN COMPONENT
// -----------------------------------------
const Pillers = () => {
  const pillars = [
    {
      id: 1,
      title: "User Interface (UI)",
      desc: "What people see",
      icon: IconUI,
    },
    {
      id: 2,
      title: "User Experience (UX)",
      desc: "What people feel",
      icon: IconUX,
    },
    {
      id: 3,
      title: "Customer Experience (CX)",
      desc: "How customers interact & respond",
      icon: IconCX,
    },
    {
      id: 4,
      title: "Self Experience (SX)",
      desc: "Who you are? What is your purpose?",
      icon: IconSX,
    },
    {
      id: 5,
      title: "Geographic Experience (GEOX)",
      desc: "Location strategy, presence & expansion",
      icon: IconGEOX,
    },
    {
      id: 6,
      title: "Interior Design Experience (IDX)",
      desc: "Space, architecture & ambiance",
      icon: IconIDX,
    },
    {
      id: 7,
      title: "AI Experience (AIX)",
      desc: "Automate repetitive tasks & reduce cost",
      icon: IconAIX,
    },
    {
      id: 8,
      title: "Asset Management Experience (AMX)",
      desc: "Build your brand’s valuation",
      icon: IconAMX,
    },
  ];

  return (
    <div className="min-h-screen bg-black/90 flex justify-center items-center px-4 sm:px-6 py-16">
      <div className="w-full max-w-7xl bg-[#FF8C13] rounded-3xl px-6 sm:px-10 md:px-20 py-12 sm:py-16 text-black">
        {/* HEADER */}
        <div className="mb-14 sm:mb-20 text-left max-sm:text-center fade-top">
          <p className="text-md sm:text-lg font-light">The Solution</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mt-2">
            Holistic Pillar Strategy
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 sm:gap-16">
          {pillars.map((p, i) => (
            <PillarItem key={p.id} pillar={p} Icon={p.icon} delay={i * 0.2} />
          ))}
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeSlideFromTop {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-top {
          opacity: 0;
          animation: fadeSlideFromTop 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Pillers;
