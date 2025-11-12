import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import LatestCropSection from '../../components/LatestCropSection/LatestCropSection'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import AgroNews from '../../components/AgroNews/AgroNews'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <LatestCropSection/>
      <HowItWorks/>
      <AgroNews/>
    </>
  )
}

export default Home