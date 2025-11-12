import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import StepCard from "../StepCard/StepCard";

const HowItWorks = () => {
    const [steps, setSteps] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/steps')
            .then(data => setSteps(data.data))
            .catch(error => {
                // console.log(error.code)
            })
    }, [])
    return (
        <section className="py-10 bg-white lg:py-20">
            <div className="container px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-green-600">How <span className="text-gray-800">KrishiLink</span> Works</h2>
                    <p className="text-gray-600 mt-3">Follow these simple steps to connect farmers and buyers efficiently.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center relative z-10">
                    {steps?.map((step, idx) => (
                        <StepCard step={step} key={step._id} idx={idx} />
                    ))}
                </div>
            </div>
            <div className="absolute top-10 -left-20 w-60 h-60 bg-green-100/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 -right-20 w-60 h-60 bg-green-200/30 rounded-full blur-3xl"></div>
        </section>
    );
};

export default HowItWorks;
