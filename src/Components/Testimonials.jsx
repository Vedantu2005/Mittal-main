import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    text: "Working with CEO Sarthak Mittal in launching my book, The Mandala Within: A Guide for Intuitive and Logical Minds, has been nothing short of transformative. From our very first conversation, it was clear that Sarthak operates from a rare blend of vision, precision, and purpose—the very principles my book embodies. His ability to merge sharp strategic insight with deep empathy and authenticity turned what could have been a daunting process into a creative, inspired collaboration.",    
    name: "Clay Boykin",
    title: "Author | Thought Partner | Guide",
    img: "/testi1.png",
  },
  {
    text: "Sarthak is a very versatile businessman that has the skills on all technical matter about marketing, SEO, digitalizing, social media, where he combines these skillsto get personnal solutions for his client. And all above and most important, he knows how important in life, is that, connecting to the right people and have personnal meetings are much more important.In life it does not matter what you know, but it is all about 'WHO' you know.",
    name: "Vincent Messelier",
    title: "Passionate Artist",
    img: "/testi2.jpg",
  },
  {
    text: "It has been a genuine pleasure working with Sarhak. He is so knowledgeable about marketing. Sarthak redesigned my website, and prospects are now spending more time exploring the site and learning about the services my organization provides. He is always positive and really cares about the success of his clients. I highly recommend him for your branding and messaging needs.",
    name: "Maureen Boehm",
    title: "Top 15 Career Coach",
    img: "/testi3.jpg",
  },
  {
    text: "In just a brief interaction, Sarthak Mittal completely shifted how I view branding. He reminded me that a powerful brand and authentic voice start with purpose, not just a portfolio. He walked me through examples of what it truly means to showcase your essence — not just what you do, but who you are. The clarity he brought to this concept was incredible, and he didn’t stop there. Sarthak gave me actionable, immediately applicable steps to elevate my online presence and align it with my deeper mission.",
    name: "Andriana Nunez",
    title: "Life and Business Strategist",
    img: "/testi4.jpg",
  },
  {
    text: "Sarthak is a very intelligent and an out of the box thinker. He is a professional and is meticulous in his job! He is dynamic and is filled with ideas and new ways of looking at everything! Any challenge put to him he knows to handle it very well. I wish him all the best in all his endeavours. God bless you Sarthak with lots of success, happiness and good health always!",
    name: "Dr.Sai Sanskrithi",
    title: "Professor, TEDx Speaker, Author",
    img: "testi5.jpg",
  },
  {
    text: "Sarthak and his team were great to work with. They were prompt and very professional in getting our project done. Thanks to him and his team on the rebrand and updates for my company.",
    name: "Colin Strong",
    title: "Founder & CEO, FinServe360",
    img: "/testi6.jpg",
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -350 : 350,
        behavior: "smooth",
      });
    }
  };

  /* =====================================================
        AUTO-SCROLL FOR MOBILE ONLY
  ===================================================== */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Only mobile screens (<768px)
    if (window.innerWidth >= 768) return;

    let interval = setInterval(() => {
      if (!container) return;

      // Scroll right by 280px (mobile card width)
      container.scrollBy({ left: 280, behavior: "smooth" });

      // If reached end → return to left
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    // Stop auto-scroll when user interacts
    const stopScroll = () => {
      clearInterval(interval);
    };

    container.addEventListener("touchstart", stopScroll);
    container.addEventListener("mousedown", stopScroll);

    return () => {
      clearInterval(interval);
      container.removeEventListener("touchstart", stopScroll);
      container.removeEventListener("mousedown", stopScroll);
    };
  }, []);
  /* ===================================================== */

  return (
    <section className="bg-black/90 text-white py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden cursor-pointer">

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-10 sm:mb-12">
        What leaders say about{" "}
        <span className="font-semibold">Sarthak Mittal</span>
      </h2>

      {/* Left Arrow (Hidden on mobile) */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-2 sm:left-4 
          top-[55%] sm:top-1/2 
          transform -translate-y-1/2 
          bg-white/10 hover:bg-white/20 
          p-2 sm:p-3 rounded-full transition z-20
          max-sm:hidden
        "
      >
        <FaChevronLeft className="text-white text-lg sm:text-xl" />
      </button>

      {/* Right Arrow (Hidden on mobile) */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-2 sm:right-4 
          top-[55%] sm:top-1/2 
          transform -translate-y-1/2 
          bg-white/10 hover:bg-white/20 
          p-2 sm:p-3 rounded-full transition z-20
          max-sm:hidden
        "
      >
        <FaChevronRight className="text-white text-lg sm:text-xl" />
      </button>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="
          flex space-x-6 sm:space-x-8 
          overflow-x-scroll scroll-smooth scrollbar-hide 
          pb-4 pt-2
          -mx-4 px-4 sm:mx-0 sm:px-0
        "
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="
              flex-shrink-0 bg-[#0D0D0D] rounded-3xl 
              w-[260px] sm:w-[320px] md:w-[420px] 
              p-6 sm:p-8 border border-gray-800 
              hover:border-gray-600 transition duration-500 shadow-xl
            "
          >
            {/* Image */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src={t.img}
                alt={t.name}
                className="
                  w-14 h-14 sm:w-20 sm:h-20 
                  rounded-full object-cover border-2 border-white/20 shadow-md
                "
              />
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              “{t.text}”
            </p>

            <div className="border-t border-gray-700 mb-4"></div>

            {/* Name */}
            <p className="font-serif italic text-lg">{t.name}</p>
            <p className="text-xs sm:text-sm text-gray-400">{t.title}</p>
          </div>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Testimonials;
