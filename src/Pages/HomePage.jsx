// src/App.jsx

import React from 'react';
import Navbar from './../Components/Navbar';
import Hero from '../Components/Hero';
import WhatWeDo from '../Components/WhatWeDo';
import Workshops from '../Components/Workshops';
import OurFocus from '../Components/OurFocus';
import Video from '../Components/Video';
import LetsRock from '../Components/LetsRock';
import Footer from '../Components/Footer';

function HomePage() {
  return (
    <>
    <Navbar />
    <Hero />
    <WhatWeDo />
    <Workshops />
    <OurFocus />
    <Video />
    <LetsRock />
    <Footer />
    </>


  );
}

export default HomePage;