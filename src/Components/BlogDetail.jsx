// src/Components/BlogDetail.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CornerPointer from "./CornerPointer";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// ... (Keep slugifyHeading and estimateReadingTime helpers) ...

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    // Query Firestore for the blog with the matching slug
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setBlog(snapshot.docs[0].data());
      } else {
        setBlog(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [slug]);

  const readingMinutes = useMemo(() => {
    if (!blog?.content) return 0;
    // Handle if content is HTML string (from admin) vs JSON (legacy)
    if (typeof blog.content === 'string') {
        // Simple word count for HTML string
        const words = blog.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
        return Math.max(1, Math.round(words / 200));
    }
    return 0; // Fallback
  }, [blog]);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <Link to="/blogs" className="inline-flex items-center text-sm text-gray-400 mb-6 hover:text-white transition">
          <span className="mr-2">←</span> Back to all blogs
        </Link>

        {/* HERO */}
        <section className="flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-center">
          <div className="md:w-[45%]">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4">Insight Article</p>
            <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-6">{blog.title}</h1>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-400" /><span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-400" /><span>{readingMinutes} mins to read</span>
              </div>
            </div>
          </div>
          <div className="md:w-[55%] relative">
             <div className="relative rounded-[32px] overflow-hidden">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto max-h-[520px] object-cover" />
             </div>
             <CornerPointer className="absolute left-1/2 -top-6 -translate-x-1/2 rotate-90" />
             {/* ... other pointers ... */}
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="mt-16 md:mt-24 flex justify-center">
          <article className="space-y-6 text-[17px] leading-[1.8] text-gray-200 max-w-4xl text-justify">
             {/* Use dangerouslySetInnerHTML because admin saves as HTML string */}
             <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;