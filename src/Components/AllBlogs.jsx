// src/Components/AllBlogs.jsx
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

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
// 2. Estimate reading time
// ------------------------------
const estimateReadingTime = (content) => {
  if (!content) return 1;
  const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
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

  const img = blog.imageUrl || ""; // Use imageUrl from Firebase
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
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg mb-4 bg-gray-900">
          {img ? (
            <img
              src={img}
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
          {blog.author || "Admin"} &nbsp;•&nbsp; {minutes} mins to read
        </div>
      </div>
    </Link>
  );
};

// ------------------------------
// 4. MAIN AllBlogs Component
// ------------------------------
const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ALL blogs, ordered by newest first
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="bg-black/90 min-h-screen text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-black/90 text-white py-16 px-6 md:px-12 min-h-screen font-sans border-t border-gray-900">
      
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
        <h2 className="text-4xl md:text-5xl font-light mb-12">All Blogs</h2>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;