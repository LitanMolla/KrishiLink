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
  const handleSearch = (event) => {
    const search = event.target.value.trim().toLowerCase()
    axiosPublic.get(`/crops?search=${search}`)
      .then(data => setCrops(data.data))
  }
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="flex justify-between items-center mb-5 flex-col sm:flex-row gap-5">
            <div className="text-center sm:text-left">
              <h2 className='text-3xl lg:text-4xl font-semibold text-green-600 mb-2'>All Crops</h2>
              <p className='text-gray-600'>Browse fresh crops from farmers across the country
              </p>
            </div>
            <div className="max-w-md">
              <input onChange={handleSearch} className='border border-green-500 px-5 py-2.5 rounded-md outline-green-600 w-full' type="search" placeholder='Search...' />
            </div>
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
          <h4></h4>
        </div>
      </section>
    </>
  )
}

export default AllCrops