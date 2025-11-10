import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import SuccessToast from '../../utils/SuccessToast'
import ErrorToast from '../../utils/ErrorToast'

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { user, updateUser, setUser } = useAuth();
  const useremail = user?.email;
  const userName = user?.displayName;
  const photo = user?.photoURL;
  const handleEdit = (event) => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const photoURL = event.target.photo.value;
    updateUser({ displayName, photoURL })
      .then(() => {
        SuccessToast('Profile Update Successfully')
        setUser({ ...user, displayName, photoURL })
        setIsEdit(!isEdit)
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  return (
    <>
      <section className='my-10'>
        <div className="container">
          <div className="max-w-xl mx-auto bg-white p-10 rounded-lg shadow-sm duration-300 hover:shadow-lg border-l-2 border-l-green-600 w-full space-y-3 text-center border-b-2 border-b-green-600">
            <h4 className='text-3xl font-semibold text-center'>Profile Information</h4>
            <img className='h-40 w-40 object-cover mx-auto rounded-xl border border-gray-300' src={photo} alt={userName} />
            <h4 className='text-xl font-medium'>Name: {userName}</h4>
            <p>Email: {useremail}</p>
            {
              !isEdit
              &&
              <button onClick={() => setIsEdit(!isEdit)} className='bg-linear-to-r from-green-400 to-green-600 px-5 py-2 text-white rounded-md cursor-pointer'>Edit</button>
            }
            <form onSubmit={handleEdit} hidden={!isEdit} className='w-full text-left space-y-3'>
              <div className="">
                <label>Name</label>
                <input defaultValue={userName} name='name' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="text" placeholder='Enter your full name' />
              </div>
              <div className="">
                <label>Photo</label>
                <input defaultValue={photo} name='photo' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="url" placeholder='Enter your photo URL' />
              </div>
              <input className='block text-center bg-linear-to-r hover:brightness-105 duration-300 from-green-400 to-green-600 rounded-md text-white w-full py-2.5 cursor-pointer' type="submit" value="Save" />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile