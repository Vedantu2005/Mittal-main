import React from 'react';

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

const OneToOne = () => {
  return (
    <section className="bg-black/90 text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-normal tracking-tight leading-tight">
              What makes us <br />different
            </h2>

            <p className="text-2xl sm:text-3xl leading-relaxed">
              We build your brand <br />
              while <span className="italic font-serif">you relax</span>.
            </p>
          </div>

          {/* RIGHT COLUMN WITH VIDEO */}
          <div className="lg:col-span-1 flex justify-center relative">
            <div className="relative w-full max-w-[950px]">

              {/* VIDEO WRAPPER */}
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <video
                  src="/video2.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* TOP POINTER (visible everywhere) */}
              <CornerPointer
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 
                absolute top-0 left-1/2 -translate-x-1/2 rotate-90
                -mt-6 sm:-mt-8 md:-mt-10"
              />

              {/* RIGHT POINTER (hidden on mobile) */}
              <CornerPointer
                className="hidden sm:block w-6 h-6 md:w-7 md:h-7 
                absolute right-0 top-1/2 -translate-y-1/2 rotate-180
                -mr-6 md:-mr-10"
              />

              {/* BOTTOM POINTER (visible everywhere) */}
              <CornerPointer
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 
                absolute bottom-0 left-1/2 -translate-x-1/2 rotate-270
                -mb-6 sm:-mb-8 md:-mb-10"
              />

              {/* LEFT POINTER (hidden on mobile) */}
              <CornerPointer
                className="hidden sm:block w-6 h-6 md:w-7 md:h-7 
                absolute left-0 top-1/2 -translate-y-1/2 rotate-0
                -ml-6 md:-ml-10"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OneToOne;
