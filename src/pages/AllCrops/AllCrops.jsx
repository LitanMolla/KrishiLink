import React, { useEffect, useState } from 'react'
import CropCard from '../../components/CropCard/CropCard'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loader from '../../components/Loader/Loader';

const AllCrops = () => {
  const axiosPublic = useAxiosPublic();
  const [pending, setPending] = useState(false)
  const [crops, setCrops] = useState([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState('')
  const totalPage = Math.ceil(total / limit)
  useEffect(() => {
    setPending(true)
    axiosPublic.get(`/crops?limit=${limit}&skip=${limit * currentPage}&search=${search}`)
      .then(data => {
        setCrops(data.data.data)
        setTotal(data.data.total)
      })
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [skip, currentPage, search])
  const handlePagination = (index) => {
    setCurrentPage(index)
  }
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="flex justify-between items-center mb-5 flex-col lg:flex-row gap-5">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-green-600 mb-3">All <span className="text-gray-800">Crops</span></h2>
              <p className='text-gray-600'>Browse fresh crops from farmers across the country
              </p>
            </div>
            <div className="max-w-md">
              <input onChange={(e) => setSearch(e.target.value)} className='border border-green-500 px-5 py-2.5 rounded-md outline-green-600 w-full' type="search" placeholder='Search...' />
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
          {
            crops.length === 0
            &&
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No crops found</h3>
              <p className="text-gray-600">
                Currently there are no crops to show.
              </p>
            </div>
          }
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            {
              currentPage > 0 && <button onClick={() => setCurrentPage(prv => prv - 1)} className='text-green-500 border border-gre  px-5 py-2.5 rounded-md font-semibold cursor-pointer duration-300 hover:bg-green-500 hover:text-white bg-white'>PREV</button>
            }
            {
              Array.from({ length: totalPage }).map((item, index) => (
                <button onClick={() => handlePagination(index)} key={index} className={`${currentPage === index ? 'bg-green-500 text-white' : 'bg-white'} text-green-500 border border-gre  px-5 py-2.5 rounded-md font-semibold cursor-pointer duration-300 hover:bg-green-500 hover:text-white`}>{index + 1}</button>
              ))
            }
            {
              currentPage < totalPage - 1 && <button onClick={() => setCurrentPage(prv => prv + 1)} className='text-green-500 border border-gre  px-5 py-2.5 rounded-md font-semibold cursor-pointer duration-300 hover:bg-green-500 hover:text-white bg-white'>NEXT</button>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default AllCrops