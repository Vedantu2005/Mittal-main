import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Arrow SVG component
const ArrowSVG = ({ className = "" }) => (
  <svg
    className={`w-6 h-6 text-white ${className}`}
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    ></path>
  </svg>
);

// Circular hover arrow button
const CircularArrowButton = () => (
  <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-white transition-all duration-300 group hover:bg-white/10">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 md:h-10 md:w-10 text-white transition-transform duration-500 ease-in-out transform -rotate-45 group-hover:rotate-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

// Step item with animated vertical line
const Step = ({ number, title, description, pattern }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <div className="flex flex-col items-start text-left relative px-4 md:px-8">
      <div className="text-4xl md:text-5xl italic font-serif text-white mb-6">{number}</div>
      <div className="flex items-center justify-start h-14 mb-4">{pattern}</div>
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-2">{title}</h3>
      <p className="text-base md:text-lg text-gray-300 max-w-sm mt-2">{description}</p>

      {/* Animated vertical connecting line */}
      <motion.div
        ref={ref}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={controls}
        variants={{
          visible: { scaleY: 1, opacity: 1 },
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute right-0 top-20 w-px h-[220px] bg-white origin-top hidden xl:block"
      ></motion.div>
    </div>
  );
};

const NextSteps = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section (Horizontal Layout) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-24">
          <img
            src="/face2.webp"
            alt="Coach"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-2 border-white"
          />
          <div className="flex flex-col space-y-6 md:space-y-8 text-left">
            <p className="text-lg md:text-2xl leading-relaxed font-light">
              Once you’ve completed your workshop, you might feel it’s the perfect time to move
              onto a one-to-one coaching package.
            </p>
            <p className="text-3xl md:text-4xl leading-snug font-light">
              Here, you’ll receive further training, resources, support, and accountability to ensure
              you achieve the plan we created in your sprint.
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-28 w-full border-t border-gray-700 pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 w-full">
            <Step
              number="1"
              title="Clarity"
              description="We help you achieve a clear understanding of your unique brand."
              pattern={
                <div className="flex flex-col space-y-1">
                  <ArrowSVG className="-rotate-270"/>
                  <ArrowSVG className="-rotate-270"/>
                  <ArrowSVG className="-rotate-270"/>
                </div>
              }
            />
            <Step
              number="2"
              title="Communication"
              description="We ensure your message is impactful and authentic."
              pattern={
                <div className="grid grid-cols-2 gap-1 rotate-45">
                  <ArrowSVG />
                  <ArrowSVG className="-rotate-90" />
                  <ArrowSVG className="rotate-90" />
                  <ArrowSVG className="rotate-180" />
                </div>
              }
            />
            <Step
              number="3"
              title="Content"
              description="We create memorable content that resonates with your audience."
              pattern={
                <div className="flex flex-col items-center space-y-1 -rotate-45">
                  <ArrowSVG />
                  <ArrowSVG className="rotate-45" />
                  <ArrowSVG className="-rotate-45" />
                </div>
              }
            />
            <Step
              number="4"
              title="Channel"
              description="We identify the best platforms to amplify your voice."
              pattern={
                <div className="flex justify-start space-x-2">
                  <ArrowSVG className="rotate-180" />
                  <ArrowSVG />
                  <ArrowSVG className="-rotate-180" />
                </div>
              }
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center md:justify-end mt-32 group">
          <p className="text-4xl md:text-5xl font-normal font-serif transition-all duration-300 ease-in-out group-hover:italic group-hover:underline mr-8">
            Ready for the Next Step?
            <br />
            <span className="italic">Let’s go!</span>
          </p>
          <CircularArrowButton />
        </div>
      </div>
    </section>
  );
};

export default NextSteps;
