import { useEffect, useState } from "react";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../Loader/Loader";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const axiosPublic = useAxiosPublic()
  const [pending, setPending] = useState(false)
  useEffect(() => {
    axiosPublic.get('/testimonials')
      .then(data => setTestimonials(data.data))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [])
  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600">Farmers’ <span className="text-gray-800">Success Stories</span></h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Real farmers and traders share how <span className="text-green-600 font-medium">KrishiLink</span> transformed their agricultural business.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pending?<Loader/> : testimonials?.map((item) => (
            <TestimonialCard testimonial={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
