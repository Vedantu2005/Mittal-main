import React, { useState, useEffect, useRef } from "react";

//
// CORNER POINTER (desktop only)
//
const CornerPointer = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-white hidden lg:block ${className}`}>
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

//
// MAIN SLIDE-IN HOOK
//
const useSlideIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.3 }
    );

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
};

//
// TEXT SLIDE-DOWN HOOK
//
const useTextSlideDown = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setShow(true));
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return [ref, show];
};

//
// TIMELINE ITEM
//
const TimelineItem = ({ data }) => {
  const [ref, visible] = useSlideIn();
  const [textRef, textVisible] = useTextSlideDown();

  const isRight = data.side === "right";
  const isTitleItem = data.id === "intro";
  const isOutroItem = data.id === "outro";

  const verticalSpacingClass = isTitleItem
    ? "mt-4 lg:mt-0 mb-6 lg:mb-16"
    : "my-10 lg:my-16";

  return (
    <div
      ref={ref}
      className={`
        relative flex w-full opacity-0 translate-y-10 transition-all duration-[1000ms] ease-out 
        ${visible ? "opacity-100 translate-y-0" : ""}
        ${isRight ? "lg:justify-end" : "lg:justify-start"} 
        ${verticalSpacingClass}
      `}>
      <div
        className={`w-full lg:w-[48%] p-4 lg:p-0 flex ${
          isRight ? "lg:pl-16" : "lg:pr-16"
        }`}>
        <div
          className={`relative w-full flex flex-col 
            ${isRight ? "lg:items-start lg:ml-auto" : "lg:items-end lg:mr-auto"}
          `}>
          {/* POINTER (desktop only) */}
          {!isTitleItem && !isOutroItem && (
            <div
              className={`absolute hidden lg:block ${
                isRight ? "left-[-48px]" : "right-[-48px] rotate-180"
              } top-[200px]`}>
              <CornerPointer />
            </div>
          )}

          {/* INTRO */}
          {isTitleItem && (
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-white mt-12 text-center lg:text-left">
              OUR LEGACY
              <span className="block italic mt-2 font-serif">
                A Journey Across 6 Generations
              </span>
              <div className="w-24 lg:w-32 h-[3px] bg-[#d6b56f] mt-4 mx-auto lg:mx-0"></div>
            </h1>
          )}

          {/* OUTRO */}
          {isOutroItem && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-12 text-center lg:text-left">
              Branding in
              <span className="block italic mt-2 font-serif">Our Roots</span>
            </h1>
          )}

          {/* REGULAR TIMELINE ITEM */}
          {!isTitleItem && !isOutroItem && (
            <>
              {/* NUMBER + ICON BLOCK */}
              <div className="flex flex-col items-center mb-6">
                {/* POINT NUMBER */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-3xl font-bold">
                  {data.number}
                </div>

                {/* SVG ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-3 h-10 w-10 text-[#d6b56f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2l4 6h-8l4-6zm0 20l-4-6h8l-4 6zm10-10l-6 4V8l6 4zM2 12l6-4v8l-6-4z"
                  />
                </svg>
              </div>

              {/* TEXT CONTENT */}
              <div
                ref={textRef}
                className={`
    opacity-0 -translate-y-6 transition-all duration-700 ease-out 
    ${textVisible ? "opacity-100 translate-y-0" : ""}
    w-full max-w-[330px]
    ${isRight ? "lg:text-left text-center" : "lg:text-right text-center"}
    mx-auto lg:mx-0
  `}>
                <p className="text-xl sm:text-2xl font-bold">{data.text}</p>
                <p className="text-white text-lg sm:text-xl leading-relaxed">
                  {data.longText}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

//
// MAIN STORY COMPONENT
//
export default function MyStory() {
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef(null);
  const animationFrameRef = useRef(null);

  const storyData = [
    { id: "intro", side: "left" },

    {
      id: 1,
      number: 1,
      text: "1907 — Founding Roots",
      longText:
        "Mr. Gangaram Mohanlal Mittal establishes India's first brass rolling mill, beginning the Mittal industrial legacy.",
      side: "right",
    },

    {
      id: 2,
      number: 2,
      text: "1950 — Malwa Metal Industries",
      longText:
        "Shri Suresh Chandra Mittal leads Malwa Metal Industries, building a respected name across the Indian metal sector.",
      side: "left",
    },

    {
      id: 3,
      number: 3,
      text: "1982 — Indore Aluminum Pvt. Ltd.",
      longText:
        "Under Mr. Ashutosh Mittal, the family expands into aluminum manufacturing, strengthening its industrial presence.",
      side: "right",
    },

    {
      id: 4,
      number: 4,
      text: "2000–2017 — Era of Decline",
      longText:
        "A period of slowdown as the Mittal family’s industrial legacy awaited its revival.",
      side: "left",
    },

    {
      id: 5,
      number: 5,
      text: "2019 — Mittal Alliance Vision",
      longText:
        "Sarthak Mittal (6th generation) launches a tech-led revival vision powered by digital transformation.",
      side: "right",
    },

    {
      id: 6,
      number: 6,
      text: "2025 — USA Expansion",
      longText:
        "Mittal Alliance Industries is officially incorporated and expands operations into the United States.",
      side: "left",
    },

    {
      id: 7,
      number: 7,
      text: "2025–2028 — Global Ambitions",
      longText:
        "With ventures in branding, technology, BPO, e-commerce and CSR, Mittal Alliance targets operations in 10+ countries.",
      side: "right",
    },

    { id: "outro", side: "right" },
  ];

  //
  // TIMELINE SCROLL LINE
  //
  const updateLineHeight = () => {
    const line = timelineRef.current;
    if (!line) return;

    const rect = line.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const startOffset = viewportHeight * 0.25;
    const scrollDistance = viewportHeight - rect.top - startOffset;
    const totalScrollHeight = rect.height - startOffset;

    let progress = (scrollDistance / totalScrollHeight) * 100;
    progress = Math.max(0, Math.min(100, progress));

    setLineHeight(progress);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          updateLineHeight();
          animationFrameRef.current = null;
        });
      }
    };

    updateLineHeight();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black/90 text-white p-4 sm:p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Vertical timeline bar */}
        <div className="absolute left-1/2 top-0 h-full w-1 transform -translate-x-1/2 hidden lg:block">
          <div className="absolute inset-0 bg-none rounded-full"></div>
          <div
            className="absolute top-0 w-full bg-white rounded-full"
            style={{ height: `${lineHeight}%` }}
          />
        </div>

        <div ref={timelineRef} className="relative">
          {storyData.map((item) => (
            <TimelineItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
