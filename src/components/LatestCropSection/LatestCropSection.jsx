import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import CropCard from '../CropCard/CropCard';
import Loader from '../Loader/Loader';
import { Link } from 'react-router';
const LatestCropSection = () => {
    const axiosPublic = useAxiosPublic();
    const [crops, setCrops] = useState([])
    const [pending, setPending] = useState(false)
    useEffect(() => {
        setPending(true)
        axiosPublic.get('/latest')
            .then(data => setCrops(data.data))
            .catch(error => {
                // console.log(error.message)
            })
            .finally(() => setPending(false))
    }, [])
    // console.log(crops)
    return (
        <>
            <section className='my-10 lg:my-20'>
                <div className="container">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-bold text-green-600 mb-3">Latest <span className="text-gray-800">Crops</span></h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Connect with real farmers. Buy with confidence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            pending ? <Loader/> :
                            crops
                            &&
                            crops.map(item => (
                                <CropCard key={item._id} crop={item} />
                            ))
                        }
                    </div>
                    <div className="text-center mt-10">
                        <Link to='/all-crops' className='bg-green-500 duration-300 hover:bg-green-600 text-white px-5 py-2.5 rounded-md inline-block mx-auto'>View All Crops</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LatestCropSection