import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Reusable hook
const useFadeSlideIn = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setVisible(true)),
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
};

const ResourcesHero = () => {
  const [titleRef, titleVisible] = useFadeSlideIn();
  const [subtitleRef, subtitleVisible] = useFadeSlideIn();
  const [descRef, descVisible] = useFadeSlideIn();

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Auto close after 2 seconds
    setTimeout(() => setShowForm(false), 2000);
  };

  return (
    <div className="bg-black/90 text-white min-h-[50vh] flex flex-col items-center justify-center p-6 md:p-12 relative">
      {/* ANIMATION CSS */}
      <style jsx="true">{`
        .fade-slide {
          opacity: 0;
          transform: translateY(-25px);
          transition: all 0.9s ease-out;
        }
        .fade-slide.visible {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>

      {/* TEXT SECTION */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <h1
              ref={titleRef}
              className={`text-4xl md:text-5xl font-medium fade-slide ${
                titleVisible ? "visible" : ""
              }`}
            >
              A vision community
            </h1>

            <h2
              ref={subtitleRef}
              className={`text-4xl md:text-5xl italic mt-2 fade-slide ${
                subtitleVisible ? "visible" : ""
              }`}
              style={{ fontFamily: '"Georgia", serif' }}
            >
              for the bold
            </h2>
          </div>

          <div>
            <p
              ref={descRef}
              className={`text-2xl text-gray-200 max-w-lg fade-slide ${
                descVisible ? "visible" : ""
              }`}
            >
              This circle of 999 Visionaries isn’t for everyone—it’s for those
              who think beyond trends and dare to redefine what’s possible. If
              you feel aligned with this purpose, you’re invited to apply and
              see if this community is where your next evolution begins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesHero;
