import React from "react";

// --- Corner Pointer SVG ---
const CornerPointer = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 6 9"
    fill="currentColor"
    className={`text-orange-400 ${className}`}>
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    ></path>
  </svg>
);

// --- Video Component ---
const Video = () => {
  return (
    <div
      className="
        relative flex items-center justify-center bg-black/90
        min-h-screen sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen
        p-4 overflow-hidden
        max-sm:min-h-0 max-sm:bg-black/90 max-sm:py-6
      "
    >
      {/* Corner Arrows */}
      <CornerPointer className="absolute top-0 left-1/2 -translate-x-1/2 rotate-90" />
      <CornerPointer className="absolute bottom-0 left-1/2 -translate-x-1/2 -rotate-90" />
      <CornerPointer className="absolute left-8 top-1/2 -translate-y-1/2 rotate-360" />
      <CornerPointer className="absolute right-8 top-1/2 -translate-y-1/2 rotate-180" />

      {/* Video Container –– FULL WIDER SIZE */}
      <div
        className="
          relative w-full 
          max-w-[1400px] 
          max-h-[680px] 
          aspect-video 
          rounded-3xl 
          overflow-hidden 
          border-2 border-transparent 
          max-sm:max-w-full max-sm:rounded-xl
        "
      >
        <video
          src="/video3.mp4"
          controls={false}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        ></video>
      </div>
    </div>
  );
};

export default Video;
