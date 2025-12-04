import React, { useState } from "react";

/* ==============================
   🔸 Reusable Arrow Icon
============================== */
const ArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`w-4 h-4 md:w-5 md:h-5 ${className}`}
  >
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    />
  </svg>
);

const CircularArrowButton = () => (
  <div
    className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16

                     rounded-full border border-white group-hover:border-white transition-colors duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 md:h-8 md:w-8 text-white transition-transform duration-500 ease-in-out transform -rotate-45 group-hover:rotate-0 group-hover:text-white"
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

/* ==============================
   🔸 SVG Patterns for Each Day
============================== */
const Day1Icon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 77" fill="none" className={className}>
    <path d="M19.043 36.3498C11.0608 35.0812 5.2883 29.6727 3.52552 23.1826L0 23.1826V53.817H3.52552C5.2883 47.3269 11.0608 41.9185 19.043 40.6498V36.3498Z" fill="currentColor" />
    <path d="M57.957 40.6497C65.9392 41.9184 71.7117 47.3268 73.4745 53.8169H77V23.1825H73.4745C71.7117 29.6726 65.9392 35.081 57.957 36.3497V40.6497Z" fill="currentColor" />
    <path d="M36.3498 57.957C35.0812 65.9392 29.6727 71.7117 23.1826 73.4745V77H53.817V73.4745C47.3269 71.7117 41.9185 65.9392 40.6498 57.957H36.3498Z" fill="currentColor" />
    <path d="M40.6502 19.043C41.9188 11.0608 47.3273 5.28831 53.8174 3.52552V0H23.183V3.52552C29.6731 5.28831 35.0815 11.0608 36.3502 19.043H40.6502Z" fill="currentColor" />
  </svg>
);

const Day2Icon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M0 16.8931C3.31727 17.4204 5.71623 19.668 6.44882 22.3652H7.91399V9.63403H6.44882C5.71623 12.3312 3.31727 14.5789 0 15.1061V16.8931Z" fill="currentColor" />
    <path d="M32 15.1059C28.6827 14.5786 26.2838 12.331 25.5512 9.63379H24.086V22.365H25.5512C26.2838 19.6678 28.6827 17.4201 32 16.8929V15.1059Z" fill="currentColor" />
    <path d="M16.8931 32C17.4204 28.6827 19.668 26.2838 22.3652 25.5512V24.086H9.63403V25.5512C12.3312 26.2838 14.5789 28.6827 15.1061 32H16.8931Z" fill="currentColor" />
    <path d="M15.1059 0C14.5786 3.31727 12.331 5.71623 9.63379 6.44882V7.91399H22.365V6.44882C19.6678 5.71623 17.4201 3.31727 16.8929 0H15.1059Z" fill="currentColor" />
  </svg>
);

const Day3Icon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 94" fill="none" className={className}>
    <path d="M22.7764 38.2891C16.2351 43.0363 8.32901 43.2937 2.49333 39.951L0 42.444L21.6622 64.1058L24.1551 61.6128C20.8124 55.7771 21.0698 47.871 25.817 41.3297L22.7764 38.2891Z" fill="currentColor" />
    <path d="M80.7335 38.2891C74.1921 43.0363 66.286 43.2937 60.4504 39.951L57.9574 42.444L79.6192 64.1058L82.1122 61.6128C78.7694 55.7771 79.0269 47.871 83.774 41.3297L80.7335 38.2891Z" fill="currentColor" />
    <path d="M51.7549 67.2676C45.2136 72.0148 37.3075 72.2723 31.4718 68.9295L28.9789 71.4225L50.6407 93.0843L53.1336 90.5913C49.7909 84.7556 50.0483 76.8495 54.7955 70.3082L51.7549 67.2676Z" fill="currentColor" />
    <path d="M51.7549 9.31061C45.2136 14.0578 37.3075 14.3152 31.4718 10.9725L28.9789 13.4654L50.6407 35.1272L53.1336 32.6343C49.7909 26.7986 50.0483 18.8925 54.7955 12.3512L51.7549 9.31061Z" fill="currentColor" />
  </svg>
);

const Day4Icon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 77 89" fill="none" className={className}>
    <path d="M19.043 42.1457C11.0608 40.8771 5.2883 35.4686 3.52552 28.9785H0V59.6129H3.52552C5.2883 53.1228 11.0608 47.7144 19.043 46.4457V42.1457Z" fill="currentColor" />
    <path d="M77 42.1457C69.0178 40.8771 63.2453 35.4686 61.4826 28.9785H57.957V59.6129H61.4826C63.2453 53.1228 69.0178 47.7144 77 46.4457V42.1457Z" fill="currentColor" />
    <path d="M48.0215 71.1242C40.0393 69.8556 34.2668 64.4471 32.504 57.957H28.9785V88.5914H32.504C34.2668 82.1013 40.0393 76.6929 48.0215 75.4243V71.1242Z" fill="currentColor" />
    <path d="M48.0215 13.1672C40.0393 11.8985 34.2668 6.49011 32.504 0H28.9785V30.6344H32.504C34.2668 24.1443 40.0393 18.7359 48.0215 17.4672V13.1672Z" fill="currentColor" />
  </svg>
);

/* ==============================
   🔸 Card Pattern Renderer
============================== */
const CardPattern = ({ day, className = "" }) => {
  switch (day) {
    case "Day 1": return <Day1Icon className={className} />;
    case "Day 2": return <Day2Icon className={className} />;
    case "Day 3": return <Day3Icon className={className} />;
    case "Day 4": return <Day4Icon className={className} />;
    default: return null;
  }
};

/* ==============================
   🔸 List Item with Arrow
============================== */
const ListItem = ({ item }) => {
  const parts = item.text.split(/(\*\*.*?\*\*)/g).filter((p) => p.length > 0);
  return (
    <li className="flex items-start">
      <ArrowIcon className="text-black mt-[2px] mr-2" />
      <span className="text-sm md:text-base leading-relaxed">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </span>
    </li>
  );
};

/* ==============================
   🔸 Card Data
============================== */
const CardData = [
  {
    day: "Day 1",
    frontTitle: "The Brand Discovery Lab – Understanding Your Brand's Core",
    backItems: [
      { text: "Clearly define **who you are**, what you stand for, and where you're headed." },
      { text: "Obstacle Radar: Uncover the biggest roadblocks holding you back." },
      { text: "Strategic Priorities: Focus your energy where it matters most." },
      { text: "Actionable Goal Map: Set clear branding goals." },
      { text: "Start crafting a **compelling brand narrative** that connects with your ideal customers." },
    ],
  },
  {
    day: "Day 2",
    frontTitle: "The Brand Identity Forge – Shaping Your Brand's Story & Purpose",
    backItems: [
      { text: "Craft a brand purpose that resonates and **sets you apart**." },
      { text: "Define your Hero & Villain Narrative." },
      { text: "Refine Vision & Mission: Clarify **your brand direction**." },
      { text: "Build a Bold Brand Promise: Inspire loyalty." },
      { text: "Develop a story-driven brand identity that **makes people care**." },
    ],
  },
  {
    day: "Day 3",
    frontTitle: "Grow Big or Go Home – Claiming Your Market & Standing Out",
    backItems: [
      { text: "Know exactly **who you're speaking to and what they need**." },
      { text: "Position strategically: **own your niche**." },
      { text: "Craft a Killer UVP — **why choose you**." },
      { text: "Analyze competition to **find your edge**." },
      { text: "Define the **moment that makes your brand unforgettable**." },
    ],
  },
  {
    day: "Day 4",
    frontTitle: "The Brand Magnet – Making Your Brand Irresistible",
    backItems: [
      { text: "Create a brand **personality people connect with**." },
      { text: "Develop a Signature Voice: **authentic & consistent**." },
      { text: "Build a story-driven brand experience." },
      { text: "Map the customer journey from **first touch to fan**." },
      { text: "Plan actionable steps to **bring it to life**." },
    ],
  },
];

/* ==============================
   🔸 Flip Card Component
============================== */
const FlipCard = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const orangeBg = "#FF8C13";

  return (
    <div
      className="relative w-full cursor-pointer [perspective:1000px] border border-white rounded-2xl transition-all duration-700"
      style={{ height: isFlipped ? "110%" : "100%", transition: "height 0.6s ease" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-all duration-1000 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 h-full w-full rounded-2xl p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden]"
          style={{ backgroundColor: "black" }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white">{data.day}</h3>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <CardPattern day={data.day} className="text-white w-full h-full" />
            </div>
            <p className="text-white text-lg md:text-xl font-medium text-center mt-8">
              {data.frontTitle}
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 h-full w-full rounded-2xl p-6 md:p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-start overflow-hidden"
          style={{ backgroundColor: orangeBg }}
        >
          <div className="flex justify-between items-start border-b border-black/40 pb-4 mb-6">
            <h3 className="text-4xl md:text-5xl font-bold text-black">{data.day}</h3>
            <div className="w-10 h-10 md:w-12 md:h-12 text-black">
              <CardPattern day={data.day} className="text-black w-full h-full" />
            </div>
          </div>
          <ul className="text-black space-y-5">
            {data.backItems.map((item, i) => (
              <ListItem key={i} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ==============================
   🔸 Main JoinUs Component
============================== */
const JoinUs = () => {
  return (
    <div className="bg-black min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="text-gray-400 text-base md:text-lg">Time to become a Pro!</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Join us for an unforgettable 4-day workshop that packs a punch!
          </h1>
        </header>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-[70vh] md:h-[60vh] lg:h-[75vh]">
          {CardData.map((data, i) => (
            <FlipCard key={i} data={data} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 flex justify-end items-center">
          <div className="flex items-center space-x-4 group">
            {" "}
            {/* space-x for gap, group for hover */}
            <p
              className="text-3xl text-white md:text-4xl font-normal leading-tight font-serif

                          transition-all duration-300 ease-in-out group-hover:italic group-hover:underline">
              Let's create brands 
              <br />
              that break boundaries
            </p>
            <CircularArrowButton />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default JoinUs;
