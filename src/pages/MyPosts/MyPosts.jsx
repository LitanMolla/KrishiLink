import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useAuth from '../../hooks/useAuth'
import MyPostCard from '../../components/MyPostCard/MyPostCard'

const MyPosts = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [posts, setPosts] = useState([])
  const userEmail = user?.email;
  useEffect(() => {
    axiosPublic.get(`/my-crops?email=${userEmail}`)
      .then(data => {
        setPosts(data.data)
      })
      .catch(error => {
        // console.log(error.message)
      })
  }, [userEmail])
  return (
    <div>
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-6xl rounded-xl bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-b-gray-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">My Posts</h2>
              <p className="text-sm text-gray-600">Manage your crop listings</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-center">Price/Unit</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {
                  posts?.map(item => (
                    <MyPostCard key={item._id} setPosts={setPosts} post={item} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyPosts