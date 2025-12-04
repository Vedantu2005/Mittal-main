import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// ------------------------------
// 1. Intersection Observer Hook
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
// 2. Estimate Reading Time
// ------------------------------
const estimateReadingTime = (content) => {
  if (!content) return 1;
  const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags from rich text
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// ------------------------------
// 3. Blog Card Component (Exact UI & Animation)
// ------------------------------
const BlogCard = ({ blog }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const minutes = estimateReadingTime(blog.content);

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      ref={ref}
      className="relative p-0.5 rounded-xl group transition-all duration-300 ease-in-out border border-transparent block h-full"
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
      <div
        className="
          relative z-10 bg-black rounded-[calc(0.75rem-0.125rem)]
          h-full w-full p-4 flex flex-col 
          hover:shadow-lg hover:shadow-white/20 transition-shadow duration-300
        "
      >
        {/* Image - Exact dimensions from your snippet */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg mb-4 bg-gray-900">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-normal text-white leading-tight flex-grow mb-4">
          {blog.title}
        </h3>

        {/* Meta */}
        <div className="mt-auto text-sm text-gray-400">
          {blog.author} &nbsp;•&nbsp; {minutes} mins to read
        </div>
      </div>
    </Link>
  );
};

// ------------------------------
// 4. Main Blogs Component
// ------------------------------
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch top 3 most recent blogs
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(3) 
        );
        const querySnapshot = await getDocs(q);
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="bg-black/90 min-h-[500px]"></div>;

  return (
    <div className="bg-black/90 text-white py-16 px-6 md:px-12 font-sans">
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
        <h2 className="text-4xl md:text-5xl font-light mb-12">Blogs</h2>

        {/* Blogs Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* 'All Blogs' CTA Link */}
        <div className="mt-8">
          <Link
            to="/blogs"
            className="group flex items-center justify-start w-fit"
          >
            <h2 className="text-2xl md:text-4xl p-4 font-serif font-light cursor-pointer pl-0">
              <span className="inline-block transition-all duration-500 group-hover:italic group-hover:underline">
                All Blogs
              </span>
            </h2>

            <div
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16
                         rounded-full border border-white group-hover:border-white
                         transition-colors duration-300 ease-in-out ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 md:h-8 md:w-8 text-white transition-transform duration-500 transform -rotate-45 group-hover:rotate-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;