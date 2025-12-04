// src/components/Referral.jsx
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserFriends, faUsers } from "@fortawesome/free-solid-svg-icons";

// Fade + Slide Down Hook
const useFadeSlideIn = () => {
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

const Referral = () => {
  const [headerRef, headerVisible] = useFadeSlideIn();
  const [circleRef, circleVisible] = useFadeSlideIn();
  const [tiersRef, tiersVisible] = useFadeSlideIn();

  const tiers = [
    {
      title: "Level 1 Referral",
      reward: "Earn 15% for every direct referral.",
      icon: faUserTie,
    },
    {
      title: "Level 2 Referral",
      reward: "Earn 7% when your referral brings another.",
      icon: faUserFriends,
    },
    {
      title: "Level 3 Referral",
      reward: "Earn 3% through extended referral networks.",
      icon: faUsers,
    },
  ];

  return (
    <section className="relative bg-black text-white py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-24 overflow-hidden main-font">

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-36 sm:w-48 h-36 sm:h-48 bg-[#D6B56F22] blur-[100px] sm:blur-[120px] top-10 left-10"></div>
        <div className="absolute w-44 sm:w-56 h-44 sm:h-56 bg-[#D6B56F11] blur-[120px] sm:blur-[140px] bottom-10 right-10"></div>
      </div>

      {/* Header */}
      <h2
        ref={headerRef}
        className={`text-3xl sm:text-5xl lg:text-6xl font-light leading-tight mb-16 sm:mb-20 lg:mb-24 transition-all duration-700 
        ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        Referral Model
      </h2>

      {/* ==== Flow Circles ==== */}
      <div
        ref={circleRef}
        className="flex flex-col sm:flex-row items-center justify-center mb-20 sm:mb-24 lg:mb-28 relative w-full"
      >
        {/* Animated dotted line */}
        <div
          className={`
            absolute 
            ${/* Horizontal on desktop, vertical on mobile */""}
            hidden sm:block top-1/2 left-0 right-0 border-t border-dotted border-[#D6B56F55]
            transition-all duration-[1300ms] ease-out 
            ${circleVisible ? "opacity-100 w-full" : "opacity-0 w-0"}
          `}
        ></div>

        {/* Mobile vertical dotted line */}
        <div
          className={`
            sm:hidden absolute left-1/2 top-0 bottom-0 border-l border-dotted border-[#D6B56F55]
            transition-all duration-[1300ms]
            ${circleVisible ? "opacity-100 h-full" : "opacity-0 h-0"}
          `}
        ></div>

        <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-12 z-10">

          {/* Circle 1 */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#D6B56F] flex flex-col items-center justify-center 
              bg-[#111] shadow-[0_0_18px_rgba(214,181,111,.25)]
              transition-all duration-700 ease-out
              ${circleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <FontAwesomeIcon icon={faUserTie} className="text-[#D6B56F] text-2xl sm:text-3xl mb-1" />
            <p className="text-[10px] sm:text-xs opacity-70">YOU</p>
          </div>

          {/* Circle 2 */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-neutral-700 flex flex-col items-center justify-center 
              bg-[#111] transition-all duration-700 ease-out
              ${circleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "150ms" }}
          >
            <FontAwesomeIcon icon={faUserFriends} className="text-[#D6B56F] text-2xl sm:text-3xl mb-1" />
            <p className="text-[10px] sm:text-xs opacity-70">REFERRAL</p>
          </div>

          {/* Circle 3 */}
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-neutral-700 flex flex-col items-center justify-center 
              bg-[#111] transition-all duration-700 ease-out
              ${circleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "300ms" }}
          >
            <FontAwesomeIcon icon={faUsers} className="text-[#D6B56F] text-2xl sm:text-3xl mb-1" />
            <p className="text-[10px] sm:text-xs opacity-70">NETWORK</p>
          </div>
        </div>
      </div>

      {/* ==== Tier Cards ==== */}
      <div
        ref={tiersRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
      >
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`
              relative p-8 sm:p-10 rounded-2xl 
              bg-gradient-to-br from-[#0d0d0d] to-[#161616]
              border border-neutral-800 
              shadow-[0_0_25px_rgba(0,0,0,.45)]
              transition-all duration-700 ease-out transform 
              hover:scale-[1.03] hover:border-[#D6B56F] 
              hover:shadow-[0_0_40px_rgba(214,181,111,.30)]
              
              opacity-0 translate-y-6
              ${tiersVisible ? "opacity-100 translate-y-0" : ""}
            `}
            style={{ transitionDelay: `${index * 180}ms` }}
          >
            <FontAwesomeIcon icon={tier.icon} className="text-[#D6B56F] text-3xl sm:text-4xl mb-4" />

            <h3 className="text-xl sm:text-2xl font-light mb-3">{tier.title}</h3>
            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              {tier.reward}
            </p>

            <div
              className={`
                absolute bottom-0 left-0 h-[2px] bg-[#D6B56F] 
                transition-all duration-700 
                ${tiersVisible ? "w-full" : "w-0"}
              `}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Referral;
