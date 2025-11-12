import HeroSection from '../../components/HeroSection/HeroSection'
import LatestCropSection from '../../components/LatestCropSection/LatestCropSection'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import AgroNews from '../../components/AgroNews/AgroNews'
import Testimonials from '../../components/Testimonials/Testimonials'
import Newsletter from '../../components/Newsletter/Newsletter'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <LatestCropSection/>
      <HowItWorks/>
      <AgroNews/>
      <Testimonials/>
      <Newsletter/>
    </>
  )
}

export default Home