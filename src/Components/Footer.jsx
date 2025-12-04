import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ------------------ Arrow Paths ------------------
const RIGHT_ARROW = "M14 5l7 7m0 0l-7 7m7-7H3";
const UP_ARROW = "M5 15l7-7m0 0l7 7m-7-7v14";

// ROUTE SEQUENCE
const ROUTE_ORDER = [
  "/",
  "/legacy",
  "/community",
  "/what-makes-us-different",
  "/brand-incubator",
];

// ------------------ BUTTONS ------------------
const RightArrowBtn = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center space-x-3 sm:space-x-4 cursor-pointer select-none"
    style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}>
    {text && (
      <span className="text-xl sm:text-2xl md:text-3xl font-normal">
        {text}
      </span>
    )}

    <div
      className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                 md:w-16 md:h-16 rounded-full border border-black transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-black transform -rotate-45 
                   group-hover:rotate-0 transition-transform duration-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d={RIGHT_ARROW} />
      </svg>
    </div>
  </button>
);

const UpArrowBtn = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center space-x-3 sm:space-x-4 cursor-pointer select-none"
    style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}>
    {text && (
      <span className="text-xl sm:text-2xl md:text-3xl font-normal">
        {text}
      </span>
    )}

    <div
      className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                 md:w-16 md:h-16 rounded-full border border-black transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-black transform 
                   group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d={UP_ARROW} />
      </svg>
    </div>
  </button>
);

// ------------------ FOOTER ------------------
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  // Back to Top
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Next Page navigation
  const handleNextPage = () => {
    const currentPath = location.pathname;

    const currentIndex = ROUTE_ORDER.indexOf(currentPath);
    const nextIndex =
      currentIndex === -1 || currentIndex === ROUTE_ORDER.length - 1
        ? 0
        : currentIndex + 1;

    navigate(ROUTE_ORDER[nextIndex]);
  };

  return (
    <div
      id="footer"
      className="bg-black/90 p-4 sm:p-6 flex flex-col items-center justify-end"
      style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}>
      <footer className="w-full bg-[#FF8C1E] rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 md:p-16 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 sm:gap-y-16 gap-x-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 flex flex-col justify-between h-full items-center lg:items-start">
            <img
              src="/logo.png"
              alt="Brand Logo"
              className="w-32 sm:w-40 mb-10 sm:mb-16"
              style={{ filter: "brightness(0)" }}
            />
            <p className="text-base sm:text-lg font-medium text-center lg:text-left">
              © Mittal Alliance 2025
            </p>
          </div>

          {/* CONTACT + LOCATIONS */}
          <div className="lg:col-span-1 flex flex-col space-y-8 w-full sm:w-[22rem] md:w-[26rem] mx-auto lg:mx-0">
            <div>
              <p className="text-lg sm:text-xl font-semibold mb-1">
                General Inquiries
              </p>
              <a href="#" className="text-lg sm:text-xl hover:underline">
                admin@mittalalliance.com
              </a>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-lg sm:text-xl font-semibold">USA</p>
                <p className="text-base sm:text-xl">
                  Palo Alto, Silicon Valley <br /> United States
                </p>
              </div>

              <div className="mt-3">
                <p className="text-lg sm:text-xl font-semibold">UK</p>
                <p className="text-base sm:text-xl">
                  VIP GB House @ Cefn Mably 1 <br />
                  Lavernock Road, Penarth <br />
                  Wales, UK, CF64 3NW
                </p>
              </div>

              <div className="mt-3">
                <p className="text-lg sm:text-xl font-semibold">India</p>
                <p className="text-base sm:text-xl">
                  Vijay Nagar Part II, Indore, India
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 cursor-pointer">
              {/* LinkedIn Icon #1 */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.linkedin.com/company/mittalalliance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8
                 transition-transform duration-300 ease-out transform-gpu
                 hover:scale-[1.015]"
                  style={{ transformOrigin: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-black">
                    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.41v1.561h.047c.475-.9 1.637-1.852 3.368-1.852 3.599 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a1.983 1.983 0 110-3.966 1.983 1.983 0 010 3.966zM6.988 20.452H3.682V9h3.306v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <span className="text-base sm:text-lg font-medium">
                  Company Linkedin
                </span>
              </div>

              {/* LinkedIn Icon #2 */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.linkedin.com/in/ceosarthakmittal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8
                 transition-transform duration-300 ease-out transform-gpu
                 hover:scale-[1.015]"
                  style={{ transformOrigin: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-black">
                    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.41v1.561h.047c.475-.9 1.637-1.852 3.368-1.852 3.599 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a1.983 1.983 0 110-3.966 1.983 1.983 0 010 3.966zM6.988 20.452H3.682V9h3.306v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <span className="text-base sm:text-lg font-medium">
                  Founder's Linkedin
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end">
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-10 sm:mb-14 space-y-4 sm:space-y-0">
              <RightArrowBtn text="Next page" onClick={handleNextPage} />
              <UpArrowBtn text="Back to top" onClick={handleBackToTop} />
            </div>

            {/* Divider */}
            <div className="border-t border-black w-full max-w-xs sm:max-w-md md:w-[510px] mb-10"></div>

            {/* CTA */}
            <h2 className="text-xl sm:text-2xl md:text-4xl font-normal leading-snug text-center lg:text-left mb-10">
              Lets build something big together
            </h2>

            {/* EMAIL ROW */}
            {/* EMAIL ROW */}
            <div className="flex items-center w-full max-w-sm sm:max-w-md md:max-w-lg justify-center lg:justify-end">
              {/* Step 1 — Not submitted */}
              {!submitted ? (
                <>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="text-base sm:text-lg bg-[#FF8C1E] px-4 sm:px-6 py-3 sm:py-4 border border-black rounded-full 
                   placeholder-black focus:outline-none focus:ring-2 focus:ring-black transition w-full mr-3"
                    id="emailInput"
                  />

                  <RightArrowBtn
                    onClick={() => {
                      const val = document.getElementById("emailInput").value;
                      if (val.trim() !== "") {
                        setSubmitted(true);

                        // Delay message (1.2 seconds)
                        setTimeout(() => {
                          setShowMessage(true);
                        }, 1200);
                      }
                    }}
                  />
                </>
              ) : !showMessage ? (
                // Step 2 — Delay State (empty or you can show loader)
                <div className="w-full text-center py-4 text-black text-lg">
                  {/* Optional: Loading animation */}
                </div>
              ) : (
                // Step 3 — Show Success Message
                <div
                  className="w-full text-center bg-[#FF8C1E] border border-black rounded-2xl py-6 px-4"
                  style={{ fontFamily: "Borna, Trebuchet MS, sans-serif" }}>
                  <p className="text-xl sm:text-2xl md:text-3xl font-normal text-black">
                    Thank you! Your submission has been received!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        #footer * {
          font-family: Borna, "Trebuchet MS", sans-serif !important;
        }
      `}</style>
    </div>
  );
};

export default Footer;
