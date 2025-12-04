import React, { useState } from "react";

// --- Circular Arrow Button ---
const CircularArrowButton = () => (
  <div
    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 
               rounded-full border border-white transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 sm:h-7 sm:w-7 text-white transform -rotate-45 transition duration-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </div>
);

// --- Custom Arrow Icon ---
const ArrowIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`w-4 h-4 sm:w-5 sm:h-5 ${className}`}
  >
    <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
  </svg>
);

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

const faqs = [
  {
    question: "What is a Personal Branding Incubator?",
    answer:
      "A Personal Branding Incubator is a holistic environment designed to nurture and elevate your brand using a multi-pillar framework. This includes UI, UX, CX, AI, SX, GX, AMX, and IDX—ensuring every layer of your brand is strategically built and fully aligned.",
  },
  {
    question: "What do we mean by a Lifetime Partnership?",
    answer:
      "A lifetime partnership means we commit to supporting and consulting you for life. You receive one dedicated session every month, along with ongoing advisory support whenever your brand evolves or requires new direction.",
  },
  {
    question: "Who can join the Personal Branding Incubator?",
    answer:
      "Entry into the Incubator is selective. We choose individuals who demonstrate vision, clarity of purpose, and the drive to build something meaningful. Only true visionaries are invited to join.",
  },
  {
    question: "How long does the Incubator program last?",
    answer:
      "The core brand audit and infrastructure setup typically takes six to seven months. Your time commitment is minimal—around 45 minutes per week. After the setup phase, you continue to receive lifetime partnership support.",
  },
  {
    question: "Do I need prior experience in branding?",
    answer:
      "Not at all. You don’t need any background in branding. We take care of building your brand—so you can stay focused on growing your business.",
  },
  {
    question: "Will I receive mentorship guidance?",
    answer:
      "Yes. You receive ongoing mentorship from us, as well as access to a global community of mentors and 999 Visionaries who offer guidance, support, and shared experience.",
  },
  {
    question: "What happens after completing the Incubator?",
    answer:
      "Upon completing the Incubator, you’ll achieve the key results promised across all service pillars. You will experience: Enhanced Customer Experience (CX), Improved User Interface (UI) and User Experience (UX), Self-Experience (SX) for inner clarity and deeper identity alignment, streamlined and automated business processes, a stronger legal branding foundation, increased deal closures and conversion rates, effortless business collaborations and enhanced trust, upgraded Geographical Experience (GX) and improved interior design alignment for offline businesses, speaking engagement opportunities including global platforms such as TED, and much more. Your results expand based on your consistency, usage, and growth journey. Your brand becomes sharper, stronger, and fully future-ready.",
  },
];


  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <>
      {/* ====================== FAQ SECTION ======================= */}
      <section className="bg-black/90 text-white px-5 sm:px-10 md:px-16 py-16">

        {/* TOP: TITLE + TEXT */}
        <div className="flex flex-col md:flex-row justify-between md:space-x-16">
          
          {/* LEFT */}
          <div className="md:w-1/3 mb-10 md:mb-0">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4">
              FAQs
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-light">
              No Mysteries Here: <br />
              <span className="italic font-medium">I will reveal All...</span>
            </p>
          </div>

          {/* RIGHT FAQS */}
          <div className="md:w-2/3 space-y-4 sm:space-y-5">
            {visibleFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">

                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-medium cursor-pointer">
                    {faq.question}
                  </h3>

                  <ArrowIcon
                    className={`cursor-pointer transform transition duration-300 ${
                      openIndex === index ? "rotate-90 text-gray-300" : "rotate-0"
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed cursor-pointer">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}

            {!showAll && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-gray-300 hover:text-white text-sm flex items-center justify-center mx-auto space-x-1"
                >
                  <span>Load more questions</span>
                  <ArrowIcon className="rotate-90 mt-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================== STATS SECTION ======================= */}
      <section className="bg-black/90 text-white px-5 sm:px-10 md:px-16 py-20 border-t border-gray-800 cursor-pointer">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-10 text-center">
            Our <span className="italic font-serif">Success</span>
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">

            {[
              { num: "3+", label: "Global Companies" },
              { num: "10+", label: "Countries Served" },
              { num: "75+", label: "Client Testimonials" },
              { num: "10+", label: "Global Awards" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border border-gray-600 flex items-center justify-center group-hover:scale-110 transition">
                  <span className="text-xl sm:text-3xl font-bold">{item.num}</span>
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-lg opacity-80">{item.label}</p>
              </div>
            ))}

          </div>

          <div className="text-center mt-12 max-w-xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              We also offer easy <span className="text-white font-medium italic">EMI options</span> to help startups join without financial stress.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Faqs;
