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
  const userEmail = user?.email;
  useEffect(() => {
    setPending(true)
    axiosPublic.get(`/interests/${userEmail}`)
      .then(data => setInterests(data.data))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [userEmail])
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="container mx-auto my-10">
            <h2 className="text-4xl font-bold text-green-600 mb-5 text-center">My <span className="text-gray-800">Interests</span></h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white max-w-3xl mx-auto">
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
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default MyInterests