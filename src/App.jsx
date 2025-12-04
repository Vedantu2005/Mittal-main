import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import React, { useState, useEffect } from "react";

// Context
import { useCountry } from "./context/CountryContext";

// Components
import Loader from "./Components/Loader";
import ChatBot from "./Components/ChatBot";
import ScrollToTop from "./Components/ScrollToTop";

// Public Pages
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ResourcesPage from "./Pages/ResourcesPage";
import OneToOnePage from "./Pages/OneToOnePage";
import WorkshopPage from "./Pages/WorkshopPage";
import BlogsPage from "./Pages/BlogsPage";
import SingleBlog from "./Pages/SingleBlog";

// Admin Pages
import Login from "./Pages/Admin/Login";
import AdminBlog from "./Pages/Admin/Blog"; // Ensure this matches your file name

function App() {
  const [loading, setLoading] = useState(true);
  
  // Check if admin is logged in (persisted in localStorage)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('isAdmin'));
  
  const { country } = useCountry();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const backgroundStyles = {
    USA: "bg-red-600/25 backdrop-blur-xl",
    UK: "bg-blue-600/30 backdrop-blur-xl",
    India: "bg-green-600/30 backdrop-blur-xl",
    default: "bg-black",
  };

  return (
    <div className="relative min-h-screen">
      {/* GLOBAL BACKGROUND */}
      <div
        className={`fixed inset-0 -z-10 transition-all duration-700 ${
          backgroundStyles[country]
        }`}
      />

      <Router>
        <ScrollToTop />

        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/legacy" element={<AboutPage />} />
          <Route path="/community" element={<ResourcesPage />} />
          <Route path="/what-makes-us-different" element={<OneToOnePage />} />
          <Route path="/how-it-works" element={<WorkshopPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<SingleBlog />} />

          {/* --- ADMIN ROUTES --- */}
          
          {/* 1. Login Route (at /admin) */}
          <Route 
            path="/admin" 
            element={
              // If already logged in, redirect to dashboard. Otherwise, show Login.
              isAdminLoggedIn ? (
                <Navigate to="/admin/blogs" replace />
              ) : (
                <Login setIsAdminLoggedIn={setIsAdminLoggedIn} />
              )
            } 
          />

          {/* 2. Dashboard Route (at /admin/blogs) */}
          <Route 
            path="/admin/blogs" 
            element={
              // If logged in, show Dashboard. Otherwise, redirect to Login.
              isAdminLoggedIn ? (
                <AdminBlog setIsAdminLoggedIn={setIsAdminLoggedIn} />
              ) : (
                <Navigate to="/admin" replace />
              )
            } 
          />

        </Routes>
      </Router>

      <ChatBot />
    </div>
  );
}

export default App;