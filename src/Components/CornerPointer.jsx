// src/components/CornerPointer.jsx
import React from "react";

const CornerPointer = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 6 9"
    className={`text-orange-400 ${className}`}
  >
    <path
      d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z"
      fill="currentColor"
    />
  </svg>
);

export default CornerPointer;
