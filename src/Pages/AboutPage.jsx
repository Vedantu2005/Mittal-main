import React from 'react'
import Navbar from '../Components/Navbar';
import AboutHero from '../Components/AboutHero';
import MyStory from '../Components/MyStory';
import Video from '../Components/Video';
import GetReady from '../Components/GetReady';
import Footer from '../Components/Footer';

const AboutPage = () => {
  return (
    <>
    <Navbar />
    <AboutHero />
    <MyStory />
    <Video />
    <GetReady />
    <Footer />
    </>
  )
}

export default AboutPage