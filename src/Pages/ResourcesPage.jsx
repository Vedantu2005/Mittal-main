import React from 'react'
import Navbar from '../Components/Navbar'
import ResourcesHero from '../Components/ResourcesHero'
import Missions from '../Components/Missions'
// Import the new Blogs component
import Blogs from '../Components/Blogs' 
import Video from '../Components/Video'
import GetReady from '../Components/GetReady'
import Footer from '../Components/Footer'

const ResourcesPage = () => {
  return (
    <>
      <Navbar />
      <ResourcesHero />
      <Missions />
      
      {/* The new Blog Section */}
      <Blogs /> 
      
      <Video />
      <GetReady />
      <Footer />
    </>
  )
}

export default ResourcesPage