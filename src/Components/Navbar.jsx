// src/components/Navigation.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCountry } from "../context/CountryContext"; // GLOBAL COUNTRY CONTEXT

// ----------------- LOGO -----------------
const Logo = () => {
  return (
    <Link
      to="/"
      className="block hover:opacity-90 transition-opacity duration-300"
    >
      <img
        src="/logo.png"
        alt="Brand Logo"
        className="h-14 w-auto animate-colorPulse"
      />
    </Link>
  );
};

// ----------------- COUNTRY SELECTOR -----------------
// const CountrySelector = () => {
//   const [hover, setHover] = useState(false);
//   const { setCountry } = useCountry(); // Update global country

//   return (
//     <div
//       className="relative flex items-center h-10 cursor-pointer overflow-hidden select-none"
//       style={{ width: "320px" }}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//     >
//       {/* Left Text */}
//       <div
//         className={`absolute left-0 top-1/2 -translate-y-1/2 text-base font-normal transition-all duration-500 
//         ${hover ? "-translate-x-6 opacity-0" : "translate-x-0 opacity-100"}`}
//       >
//         Country Selector 
//       </div>

//       {/* Flags Only (initial) */}
//       <div
//         className={`absolute right-0 top-1/4 -translate-y-1/2 flex items-center gap-6 transition-all duration-500
//         ${hover ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
//       >
//         <img
//           src="https://flagcdn.com/us.svg"
//           onClick={() => setCountry("USA")}
//           className="w-10 h-6 rounded-sm cursor-pointer"
//         />
//         <img
//           src="https://flagcdn.com/gb.svg"
//           onClick={() => setCountry("UK")}
//           className="w-10 h-6 rounded-sm cursor-pointer"
//         />
//         <img
//           src="https://flagcdn.com/in.svg"
//           onClick={() => setCountry("India")}
//           className="w-10 h-6 rounded-sm cursor-pointer"
//         />
//       </div>

//       {/* Flags + names */}
//       <div
//         className={`flex items-center gap-8 transition-all duration-500 
//         ${hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
//       >
//         <div
//           onClick={() => setCountry("USA")}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <img src="https://flagcdn.com/us.svg" className="w-10 h-6 rounded-sm" />
//           <span className="text-sm font-light">USA</span>
//         </div>

//         <div
//           onClick={() => setCountry("UK")}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <img src="https://flagcdn.com/gb.svg" className="w-10 h-6 rounded-sm" />
//           <span className="text-sm font-light">UK</span>
//         </div>

//         <div
//           onClick={() => setCountry("India")}
//           className="flex items-center gap-3 cursor-pointer"
//         >
//           <img src="https://flagcdn.com/in.svg" className="w-10 h-6 rounded-sm" />
//           <span className="text-sm font-light">India</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// ----------------- NAV ITEMS -----------------
const navItems = [
  { name: "How It Works", path: "/how-it-works" },
  { name: "What Makes Us Different", path: "/what-makes-us-different" },
  { name: "Legacy", path: "/legacy" },
  { name: "Community", path: "/community" },
  { name: "Join Waiting list", path: "#footer" },
];

const NavigationLinks = ({ isMobile = false, onLinkClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item) => {
    if (item.path === "#footer") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else {
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(item.path);
    }

    if (onLinkClick) onLinkClick();
  };

  return (
    <div className={`flex ${isMobile ? "flex-col space-y-10" : "space-x-10"}`}>
      {navItems.map((item) => (
        <div
          key={item.name}
          onClick={() => handleNavClick(item)}
          className={`group flex items-center cursor-pointer transition duration-300 
          ${isMobile ? "text-2xl font-semibold" : "text-[17px] font-normal tracking-wide"}`}
        >
          <span className="mr-3 transition-transform duration-300 group-hover:translate-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isMobile ? "24" : "12"}
              height={isMobile ? "24" : "12"}
              viewBox="0 0 6 9"
              fill="#FF8C1E"
            >
              <path d="M5.41865 3.49143C3.14576 3.15439 1.49507 1.71979 1.00247 0H0V8.11499H1.00247C1.50371 6.3952 3.14576 4.9606 5.41865 4.62356V3.49143Z" />
            </svg>
          </span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

// ----------------- MAIN NAVIGATION -----------------
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (

<section className="bg-black/90">
    <header className="text-white">
  <nav className="text-white p-4 sticky top-0 z-20 ">

        <div className="w-full flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <NavigationLinks />
          </div>

          {/* Country Selector */}
          {/* <div className="hidden md:block">
            <CountrySelector />
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden border px-5 py-2 rounded-md font-light"
            onClick={() => setIsMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </nav>

{/* Mobile Overlay Menu */}
<div
  className={`fixed inset-0 bg-black backdrop-blur-none text-white p-6 z-[999] transform transition-transform duration-300 md:hidden
  ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
>
  <div className="flex justify-between items-center mb-16">
    <Logo />
    <button
      className="border border-white w-12 h-12 flex items-center justify-center rounded-md text-xl"
      onClick={() => setIsMenuOpen(false)}
    >
      ✕
    </button>
  </div>

  {/* <div className="mb-12">
    <CountrySelector />
  </div> */}

  <NavigationLinks isMobile={true} onLinkClick={() => setIsMenuOpen(false)} />
</div>

    </header>

</section>
  );
};

export default Navigation;
