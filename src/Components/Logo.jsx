// src/components/Logo.jsx - ANIMATED with Tailwind Classes

import React, { useState, useEffect, useMemo } from 'react';

// Use the provided Tailwind classes for the font styles
const fontStyles = [
    'font-serif font-extrabold italic', // Serif, extra bold, italic
    'font-sans font-normal',           // Sans-serif, normal weight
    'font-mono font-bold',             // Monospace, bold
    'font-serif font-medium',          // Serif, medium weight
    'font-sans font-extrabold',        // Sans-serif, extra bold
];

const Logo = () => {
  // State to track the current index in the style sequence
  const [styleIndex, setStyleIndex] = useState(0);

  // Set the animation interval to be faster (e.g., 800ms)
  const ANIMATION_INTERVAL_MS = 800;
  
  // Memoize the current style class string
  const currentClasses = useMemo(() => fontStyles[styleIndex], [styleIndex]);

  // Use useEffect to cycle the styles
  useEffect(() => {
    // Set an interval to change the style index every 800 milliseconds
    const interval = setInterval(() => {
      setStyleIndex(prevIndex => (prevIndex + 1) % fontStyles.length);
    }, ANIMATION_INTERVAL_MS); 

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); 

  // We need a CSS transition class to make the change smooth
  // Since we're changing font styles which are complex, a universal transition helps.
  // Tailwind's 'transition-all duration-300' will be applied via the className.

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 200 70" 
      // Apply a fast transition to the SVG container (this is often sufficient
      // if Tailwind's Just-In-Time mode handles the changing font properties)
      className="h-16 w-auto transition-all duration-300 ease-in-out" 
      fill="currentColor"
    >
      {/* Brand Text - Dynamically applies the font classes and fixed white color */}
      <text 
        x="0" 
        y="25" 
        fill="white" // Fixed white color as requested
        // Apply dynamic and static classes. The changing classes trigger the transition.
        className={`text-2xl ${currentClasses} transition-all duration-300`} 
        style={{ fontSize: '24px', letterSpacing: '-0.5px' }} 
      >
        Brand
      </text>

      {/* Professor Text - Dynamically applies the font classes and fixed white color */}
      <text 
        x="0" 
        y="55" 
        fill="white" // Fixed white color as requested
        // Apply dynamic and static classes. The changing classes trigger the transition.
        className={`text-2xl ${currentClasses} transition-all duration-300`} 
        style={{ fontSize: '24px', letterSpacing: '-0.5px' }} 
      >
        Professor
      </text>
    </svg>
  );
};

export default Logo;