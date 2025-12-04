import React from "react";
import Navbar from "../Components/Navbar";
import OneToOne from "../Components/OneToOne";
import Footer from "../Components/Footer";
import YourStory from "../Components/YourStory";
import TheSolution from "../Components/TheSolution";
import WeGotThis from "../Components/WeGotThis";
import WorkDirectly from "../Components/WorkDirectly";
import NextSteps from "../Components/NextSteps";
import Clock from "../Components/Clock";
import WhyOtO from "../Components/WhyOtO";
import BeginOtO from "../Components/BeginOtO";
import Comparison from "../Components/Comparison";

const OneToOnePage = () => {
  return (
<div className="bg-default min-h-screen overflow-hidden">
      <Navbar />
      <OneToOne />
      <YourStory />
      <TheSolution />
      <WeGotThis />
      <WorkDirectly />
      <Comparison />
      <Clock />
      <WhyOtO />
      <BeginOtO />
      <Footer />
    </div>
  );
};

export default OneToOnePage;
