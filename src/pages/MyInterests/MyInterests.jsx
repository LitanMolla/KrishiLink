import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import InterestTable from '../../components/InterestTable/InterestTable'
import Loader from '../../components/Loader/Loader'

const MyInterests = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [interests, setInterests] = useState([])
  const [pending, setPending] = useState(false)
  const [sort, setSort] = useState('')
  console.log(sort)
  const userEmail = user?.email;
  useEffect(() => {
    setPending(true)
    axiosPublic.get(`/interests/${userEmail}?sort=${sort}`)
      .then(data => setInterests(data.data))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [userEmail, sort])
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-green-600 mb-5 text-center">My <span className="text-gray-800">Interests</span></h2>
            <select onChange={(e) => setSort(e.target.value)} className='border px-5 py-2.5 border-gray-300 rounded-md bg-white outline-green-300'>
              <option disabled selected>Sort by Quantity</option>
              <option value="1">Quantity: Low to High</option>
              <option value="-1">Quantity: High to Low</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Crop Name</th>
                  <th className="py-3 px-4 text-left">Owner</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pending ? <Loader /> : interests?.map((item, i) => <InterestTable key={i} interest={item} />)}
              </tbody>
            </table>
            {pending ? <Loader /> :
              interests?.length === 0
              &&
              <div className='my-10'>
                <h4 className='text-gray-800 text-center text-2xl font-bold'>No Interests Yet</h4>
                <p className='text-gray-500 mt-2 text-center'>Your interests will appear here once you add them.</p>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default MyInterests