// src/components/Clock.jsx
import React from 'react';

// Orange Arrow SVG Component
const OrangeArrow = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 w-5 h-5 ${className}`}
  >
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    ></path>
  </svg>
);

const Clock = () => {
  return (
    <section className="bg-black/90 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* Content Area: Video and Text */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
          
          {/* Video Column - Relative positioning for arrows */}
          <div className="relative w-full lg:w-1/2 max-w-lg md:max-w-xl overflow-visible rounded-lg"> 
            
            {/* IMPORTANT FIX: Changed overflow-hidden to overflow-visible so the negative margins on the arrows are not clipped */}
            <div className="relative overflow-hidden rounded-lg">
                <video
                  src="/clock.mp4" // Path to your video file in the public folder
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="w-full h-auto object-cover"
                >
                  Your browser does not support the video tag.
                </video>
            </div>


            {/* TOP ORANGE ARROW - Added z-20 to ensure visibility */}
            <OrangeArrow className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 ml-10 transform rotate-90 z-20" /> 

            {/* BOTTOM ORANGE ARROW - Added z-20 to ensure visibility */}
            <OrangeArrow className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-6 ml-10 transform -rotate-90 z-20" /> 
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-normal leading-tight">
              Brand takes years to form, many service provider deliver and fade. <span className="italic font-serif">We stay with you lifetime</span>
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Clock;