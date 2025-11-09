import Slider from "react-slick";
import vegetables from '../../assets/vegetables.jpg'
import handshake from '../../assets/handshake.jpg'
import working from '../../assets/working.jpg'

import './HeroSection.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <section className='mb-10 hero-slider w-full overflow-hidden'>
                <Slider {...settings}>
                    <div className="relative">
                        <img className="w-full" src={vegetables} alt="vegetables" />
                        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                            <div className="container text-center space-y-3">
                                <h2 className="text-gray-300 text-2xl md:text-4xl xl:text-5xl font-semibold">Fresh Vegetables, Direct from Local Farmers</h2>
                                <p className="text-gray-300">Fair price, natural quality, and freshly harvested crops ready for you.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img className="w-full" src={working} alt="working" />
                        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                            <div className="container text-center space-y-3">
                                <h2 className="text-gray-300 text-2xl md:text-4xl xl:text-5xl font-semibold">Connecting Farmers and Buyers, Seamlessly</h2>
                                <p className="text-gray-300">Send interest for any crop, wait for farmer approval, and complete the deal with trust and transparency.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img className="w-full" src={handshake} alt="handshake" />
                        <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                            <div className="container text-center space-y-3">
                                <h2 className="text-gray-300 text-2xl md:text-4xl xl:text-5xl font-semibold">Fair Deals, Built on Trust</h2>
                                <p className="text-gray-300">Farmers and buyers connect directly, agree transparently, and complete the deal with confidence.</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </section>
        </>
    )
}

export default HeroSection