import React, { useRef, useEffect, useState } from 'react';

// Custom Hook for Intersection Observer (To trigger border animation on scroll)
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set to true once it enters the viewport
      if (entry.isIntersecting) {
        setIntersecting(true);
        // observer.unobserve(ref.current); // Uncomment to play animation only once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Reusable Blog Card component with animated border
const BlogCard = ({ imageUrl, title }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
  });

  return (
    // Outer container for border layer
    <div 
      ref={ref}
      className="relative p-0.5 rounded-xl group transition-all duration-300 ease-in-out border border-transparent"
    >
      
      {/* Animated Border Layer */}
      <div className="absolute inset-0 rounded-[inherit] z-0 overflow-hidden">
        <div 
          // Uses the custom CSS classes defined below
          className={`absolute inset-0 border-gradient-animation rounded-[inherit] ${isVisible ? 'animate-border-pulse' : ''}`}
        ></div>
      </div>

      {/* Card Content Layer */}
      <div className="relative z-10 bg-black rounded-[calc(0.75rem-0.125rem)] 
                      h-full w-full p-4 flex flex-col hover:shadow-lg hover:shadow-white/20">
      
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
            // Removed onError fallback since we expect GIFs to be present in the public folder
          />
        </div>
        {/* Blog Title */}
        <h3 className="text-xl md:text-2xl font-normal text-white leading-tight flex-grow">
          {title}
        </h3>
      </div>
    </div>
  );
};

// Main Checklists component
const Checklists = () => {
  // Dummy data for blog posts - updated to use local GIF paths
  const blogPosts = [
    {
      id: 1,
      imageUrl: "/checklist1.jpeg", // Updated path
      title: "The Only Brand Checklist You'll Ever Need!",
    },

  ];

  return (
    <div className="bg-black text-white py-16 px-6 md:px-12">
      <style>{`
        /* Keyframes for the border animation */
        @keyframes border-pulse {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        
        /* The gradient that will be moved to create the filling effect */
        .border-gradient-animation {
          /* Starts invisible/gray (50%) then transitions to white (50%) */
          background: linear-gradient(to bottom, #333 0%, #333 50%, #fff 50%, #fff 100%); 
          background-size: 100% 200%; 
          background-position: 0% 0%; /* Start at the gray section */
          transition: border-color 0s; /* Override default transitions */
        }
        
        /* Class applied when the component enters the viewport */
        .animate-border-pulse {
          animation: border-pulse 0.8s forwards; /* 0.8s for a quick fill */
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-light mb-12">Checklists</h2>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} imageUrl={post.imageUrl} title={post.title} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Checklists;
