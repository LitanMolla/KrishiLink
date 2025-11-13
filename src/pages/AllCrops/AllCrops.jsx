import React, { useEffect, useState } from 'react'
import CropCard from '../../components/CropCard/CropCard'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loader from '../../components/Loader/Loader';

const AllCrops = () => {
  const axiosPublic = useAxiosPublic();
  const [crops, setCrops] = useState([])
  const [pending, setPending] = useState(false)
  useEffect(() => {
    setPending(true)
    axiosPublic.get('/crops')
      .then(data => setCrops(data.data))
      .catch(error => console.log(error.message))
      .finally(() => setPending(false))
  }, [])
  const handleSearch = (event) => {
    setPending(true)
    const search = event.target.value.trim().toLowerCase()
    axiosPublic.get(`/crops?search=${search}`)
      .then(data => setCrops(data.data))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="flex justify-between items-center mb-5 flex-col sm:flex-row gap-5">
            <div className="text-center sm:text-left">
              <h2 className="text-4xl font-bold text-green-600 mb-3">All <span className="text-gray-800">Crops</span></h2>
              <p className='text-gray-600'>Browse fresh crops from farmers across the country
              </p>
            </div>
            <div className="max-w-md">
              <input onChange={handleSearch} className='border border-green-500 px-5 py-2.5 rounded-md outline-green-600 w-full' type="search" placeholder='Search...' />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pending ? <Loader /> :
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