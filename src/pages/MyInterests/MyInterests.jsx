import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import InterestTable from '../../components/InterestTable/InterestTable'

const MyInterests = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [interests, setInterests] = useState([])
  const userEmail = user?.email;
  useEffect(() => {
    axiosPublic.get(`/interests/${userEmail}`)
      .then(data => {
        setInterests(data.data)
      })
  }, [userEmail])
  // console.log(interests)
  // interests?.map(item => console.log(item))
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="container mx-auto my-10">
            <h2 className="text-3xl font-semibold text-green-600 mb-5 text-center">My Interests</h2>
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
                  {interests?.map((item,i)=><InterestTable key={i} interest={item} />)}
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