// src/components/AllBlogs.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

// ------------------------------
// Intersection Observer Hook
// ------------------------------
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntersecting(true);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [options]);

  return [ref, isIntersecting];
};

// ------------------------------
// Estimate reading time
// ------------------------------
const estimateReadingTime = (content) => {
  const words = content.reduce((acc, item) => {
    if (item.type === "paragraph" || item.type === "heading")
      return acc + item.content.split(/\s+/).length;

    if (item.type === "list")
      return acc + item.content.join(" ").split(/\s+/).length;

    return acc;
  }, 0);

  return Math.max(1, Math.round(words / 200));
};

// ------------------------------
// Blog Card Component
// ------------------------------
const BlogCard = ({ blog }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const img = blog.thumbnail || blog.mainImage;
  const minutes = estimateReadingTime(blog.content);

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      ref={ref}
      className="relative p-0.5 rounded-xl group transition-all duration-300 ease-in-out border border-transparent"
    >
      {/* Border animation */}
      <div className="absolute inset-0 rounded-[inherit] z-0 overflow-hidden">
        <div
          className={`absolute inset-0 border-gradient-animation rounded-[inherit] ${
            isVisible ? "animate-border-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 bg-black rounded-[calc(0.75rem-0.125rem)]
                      h-full w-full p-4 flex flex-col hover:shadow-lg hover:shadow-white/20">

        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg mb-4">
          <img
            src={img}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-normal text-white leading-tight flex-grow">
          {blog.title}
        </h3>

        {/* Meta */}
        <div className="mt-3 text-sm text-gray-400">
          {blog.author} &nbsp;•&nbsp; {minutes} mins to read
        </div>
      </div>
    </Link>
  );
};

// ------------------------------
// MAIN AllBlogs Component
// ------------------------------
const MoreBlogs = () => {
  // Show ONLY blogs with IDs 01, 02, 03
  const filteredBlogs = blogs.filter((b) => Number(b.id) <= 3);

  return (
    <div className="bg-black/90 text-white py-16 px-6 md:px-12">

      {/* Border Animation CSS */}
      <style>{`
        @keyframes border-pulse {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        .border-gradient-animation {
          background: linear-gradient(to bottom, #333 0%, #333 50%, #fff 50%, #fff 100%);
          background-size: 100% 200%;
          background-position: 0% 0%;
        }
        .animate-border-pulse {
          animation: border-pulse 0.8s forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-light mb-12">More Blogs</h2>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MoreBlogs;
