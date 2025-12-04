import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WorkshopHero from "../Components/WorkshopHero";
import Struggle from "../Components/Struggle";
import RoadmapAnimation from "../Components/RoadmapAnimation";
import Pillers from "../Components/Pillers";
import Video from "../Components/Video";
import Testimonials from './../Components/Testimonials';
import Faqs from "../Components/Faqs";

const WorkshopPage = () => {
  return (
    <div className="bg-default min-h-screen overflow-hidden">

      <Navbar />
      <WorkshopHero />
      <Struggle />
      <RoadmapAnimation />
      <Pillers />
      <Video />
      <Testimonials />
      <Faqs />
      <Footer />
    </div>
  )
}

export default WorkshopPage;
