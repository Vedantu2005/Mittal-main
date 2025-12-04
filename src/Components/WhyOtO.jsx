import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const WhyOtO = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  // --- Scroll Animated Line ---
  const lineRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight;
      const end = -150;

      const total = start - end;
      const scrolled = start - rect.top;

      let progress = Math.min(1, Math.max(0, scrolled / total));

      setLineWidth(progress * 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section className="bg-black/90 text-white py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Headings Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">Why 1:1?</h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">Why Us?</h2>
        </div>

        {/* Content Row */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 md:gap-16 relative pb-16 md:pb-20"
        >
          {/* Column 1 */}
          <div className="relative pl-6 sm:pl-8 md:pl-12">
            
            {/* Vertical Line */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={controls}
              variants={{ visible: { scaleY: 1, opacity: 1 } }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-px h-full bg-white origin-top"
            />

            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4">
              Because Your Brand Strategy Deserves More Personal Attention
            </h3>

            <p className="text-gray-300 leading-relaxed text-lg sm:text-xl md:text-2xl">
              One session every month lifetime, focused on support and problem solving.
              We believe in quality — we have a dedicated calendar for our clients.
              We are always available for you with 24×7 support.
            </p>
          </div>

          {/* Column 2 */}
          <div className="relative pl-6 sm:pl-8 md:pl-12">

            {/* Vertical Line */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={controls}
              variants={{ visible: { scaleY: 1, opacity: 1 } }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              className="absolute left-0 top-0 w-px h-full bg-white origin-top"
            />

            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 sm:mb-4">
              With years of experience in brand strategy, we know what makes you truly unique.
            </h3>

            <p className="text-gray-300 leading-relaxed text-lg sm:text-xl md:text-2xl">
              Because we are providing you lifetime support.
            </p>
          </div>

          {/* Bottom Horizontal Line */}
          <div
            ref={lineRef}
            className="
              absolute bottom-0 left-0 
              h-px bg-none overflow-hidden 
              w-full md:w-[1500px]
            "
          >
            <div
              className="absolute top-0 left-0 h-px bg-white"
              style={{
                width: `${lineWidth}%`,
                transition: "width 0.35s linear",
              }}
            ></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyOtO;
