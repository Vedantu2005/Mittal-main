import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogDetail from "../Components/BlogDetail";
import WeGotThis from "../Components/WeGotThis";
import BeginOtO from "../Components/BeginOtO";
import MoreBlogs from "../Components/MoreBlogs";
const SingleBlog = () => {
  return (
    <>
      <Navbar />
      <BlogDetail />
      <WeGotThis />
      <MoreBlogs />
      <BeginOtO />
      <Footer />
    </>
  );
};

export default SingleBlog;
