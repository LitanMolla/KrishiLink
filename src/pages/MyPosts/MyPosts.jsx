import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useAuth from '../../hooks/useAuth'
import MyPostCard from '../../components/MyPostCard/MyPostCard'
import Loader from '../../components/Loader/Loader'

const MyPosts = () => {
  const { user } = useAuth()
  const axiosPublic = useAxiosPublic()
  const [posts, setPosts] = useState([])
  const [pending, setPending] = useState(false)
  const userEmail = user?.email;
  useEffect(() => {
    setPending(true)
    axiosPublic.get(`/my-crops?email=${userEmail}`)
      .then(data => setPosts(data.data))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [userEmail])
  return (
    <div>
      <section className="py-10">
        <h2 className="text-4xl font-bold text-green-600 mb-5 text-center">My <span className="text-gray-800">Posts</span></h2>
        <div className="container">
          <div className="rounded-xl bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden">
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
                  {pending ? <Loader /> :
                    posts?.map(item => (
                      <MyPostCard key={item._id} setPosts={setPosts} post={item} />
                    ))
                  }
                </tbody>
              </table>
            </div>
            {pending ? <Loader /> :
            posts?.length === 0
              &&
              <div className='my-10'>
                <h4 className='text-gray-800 text-center text-2xl font-bold'>Post Not Found</h4>
                <p className='text-gray-500 mt-2 text-center'>Your posts will appear here once you create them. For now, there are no posts to display.</p>
              </div>
            }
          </div>
        </div>

      </section>
    </div>
  )
}

export default MyPosts