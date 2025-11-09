import React, { useEffect, useState } from 'react'
import CropCard from '../../components/CropCard/CropCard'
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllCrops = () => {
  const axiosPublic = useAxiosPublic();
  const [crops, setCrops] = useState([])
  useEffect(() => {
    axiosPublic.get('/crops')
      .then(data => setCrops(data.data))
  }, [])
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className='text-3xl lg:text-4xl font-semibold text-green-600 mb-2'>All Crops</h2>
            <p className='text-gray-600'>Browse fresh crops from farmers across the country
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
              crops
              &&
              crops.map(item => (
                <CropCard key={item._id} crop={item} />
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default AllCrops