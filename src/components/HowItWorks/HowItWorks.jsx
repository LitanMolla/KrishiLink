import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import StepCard from "../StepCard/StepCard";
import Loader from "../Loader/Loader";

const HowItWorks = () => {
    const [steps, setSteps] = useState([])
    const axiosPublic = useAxiosPublic()
    const [pending, setPending] = useState(false)
    useEffect(() => {
        setPending(true)
        axiosPublic.get('/steps')
            .then(data => setSteps(data.data))
            .catch(error => {
                // console.log(error.message)
            })
            .finally(() => setPending(false))
    }, [])
    return (
        <section className="py-10 bg-white lg:py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-green-600">How <span className="text-gray-800">KrishiLink</span> Works</h2>
                    <p className="text-gray-600 mt-3">Follow these simple steps to connect farmers and buyers efficiently.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center relative z-10">
                    {pending ? <Loader/> :
                    steps?.map((step, idx) => (
                        <StepCard step={step} key={step._id} idx={idx} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default HowItWorks;
