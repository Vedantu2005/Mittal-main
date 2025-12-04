// src/components/WorkDirectly.jsx
import React, { useEffect, useState, useRef } from "react";

// SVG Pointer
const OrangePointer = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 w-4 h-4 mr-2 flex-shrink-0 ${className}`}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

// Slide-down reveal hook
const useSlideDown = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const WorkDirectly = () => {
  const clientCategories = [
    "Employee advocates",
    "Consultants",
    "Executives",
    "Business professionals",
    "Sales professionals",
    "Entrepreneurs",
    "Authors and speakers",
    "Coaches",
    "Career-changers",
    "Attorneys, accountants, doctors, ...",
  ];

  const [visibleItems, setVisibleItems] = useState([]);
  const [refLeft, leftVisible] = useSlideDown();
  const [refRightTop, rightTopVisible] = useSlideDown();
  const [refRightBottom, rightBottomVisible] = useSlideDown();

  // Right-side bullet stagger animation
  useEffect(() => {
    clientCategories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, 200 * index);
    });
  }, []);

  return (
    <section className="bg-black/90 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* LEFT COLUMN (Slide-down animation) */}
        <div
          ref={refLeft}
          className={`lg:pr-8 transition-all duration-700 ease-out transform
            ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
        >
          <p className="text-2xl font-medium mb-4 text-gray-300">
            Become the Part of Incubator
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold leading-tight mb-8">
            We always stay <br /> with you
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed max-w-md text-gray-300">
            For over 40 years of combined experience, we are helping our clients
            to develop their entire brand.
          </p>
        </div>

        {/* RIGHT COLUMN (Slide-down + stagger list) */}
        <div className="lg:pl-8 flex flex-col justify-between">

          {/* Right Top Section */}
          <div
            ref={refRightTop}
            className={`transition-all duration-700 ease-out transform
              ${rightTopVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
          >
            <h3 className="text-xl font-medium mb-6 text-gray-300">
              Our clients include
            </h3>

            <ul className="space-y-3">
              {clientCategories.map((item, index) => (
                <li
                  key={item}
                  className={`flex items-center text-lg sm:text-xl transform transition-all duration-500 ease-out
                    ${
                      visibleItems.includes(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                >
                  <OrangePointer /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Bottom Section (Slide-down animation) */}
          <div
            ref={refRightBottom}
            className={`mt-12 flex items-center justify-start lg:justify-end gap-4 transition-all duration-700 ease-out transform
              ${rightBottomVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}
          >
            <p className="text-3xl font-bold">...YOU</p>
            <img
              src="/face.png"
              alt="Animated Face"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkDirectly;
