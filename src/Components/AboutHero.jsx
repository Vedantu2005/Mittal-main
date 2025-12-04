import React, { useEffect, useState, useRef } from "react";

// Corner Pointer SVG
const CornerPointer = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 ${className}`}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"></path>
  </svg>
);

// TEXT ANIMATION HOOK
const useFadeSlideIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
};

const AboutHero = () => {
  const [borderVisible, setBorderVisible] = useState(false);
  const borderRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setBorderVisible(true);
        });
      },
      { threshold: 0.25 }
    );

    if (borderRef.current) io.observe(borderRef.current);
    return () => io.disconnect();
  }, []);

  const [t1Ref, t1Visible] = useFadeSlideIn();
  const [t2Ref, t2Visible] = useFadeSlideIn();
  const [t3Ref, t3Visible] = useFadeSlideIn();
  const [t4Ref, t4Visible] = useFadeSlideIn();

  return (
    <main className="font-inter bg-black/90 text-white">

      {/* Animations */}
      <style jsx="true">{`
        .fade-slide {
          opacity: 0;
          transform: translateY(-25px);
          transition: all 0.9s ease-out;
        }
        .fade-slide.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .draw-border {
          border: 2px solid white;
          border-radius: 20px;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.5s ease-out;
        }
        .draw-border.visible {
          clip-path: inset(0 0 0 0);
        }
      `}</style>

      {/* SECTION 1 */}
      <section className="min-h-[50vh] flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div
            ref={t1Ref}
            className={`fade-slide ${t1Visible ? "visible" : ""}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
              <h1 className="lg:col-span-2 text-4xl lg:text-5xl font-semibold">
                The Legacy
              </h1>

              <p className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
                Since <br />
                <span className="italic font-serif">1907</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 (Fixed Mobile Width) */}
      <section
        ref={borderRef}
        className="
          py-20 
          mx-auto 
          w-full 
          md:w-[1200px] 
          lg:w-[1500px] 
          overflow-hidden
          px-4
        "
      >
        <div
          className={`draw-border w-full rounded-2xl ${
            borderVisible ? "visible" : ""
          }`}
        >
          <div className="w-full p-8 sm:p-12 lg:p-16">

            {/* GRID (Stacks on Mobile) */}
            <div
              ref={t2Ref}
              className={`
                fade-slide 
                grid grid-cols-1 lg:grid-cols-2 
                gap-12 lg:gap-16 items-center
                ${t2Visible ? "visible" : ""}
              `}
            >
              {/* IMAGE */}
              <div className="relative w-full overflow-hidden rounded-xl shadow-xl p-4 sm:p-6">
                <img
                  src="/about1.png"
                  className="w-[90%] sm:w-[80%] mx-auto object-cover rounded-lg"
                />

                {/* Corner Pointers – repositioned for mobile */}
                <CornerPointer className="absolute top-0 left-1/2 -translate-x-1/2 rotate-90" />
                <CornerPointer className="hidden lg:block absolute right-17 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-180" />
                <CornerPointer className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-270" />
                <CornerPointer className="hidden lg:block absolute left-14 top-1/2 -translate-y-1/2" />
              </div>

              {/* TEXT */}
              <div
                ref={t3Ref}
                className={`fade-slide ${t3Visible ? "visible" : ""}`}
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-snug">
                  I DIDN’T INHERIT AN EMPIRE<br />
                  <br />
                  I INHERITED <br />
                  <span className="italic font-serif">
                    THE ASHES OF ONE
                  </span>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


    </main>
  );
};

export default AboutHero;
