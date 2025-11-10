import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import ErrorToast from '../../utils/ErrorToast'
import SuccessToast from '../../utils/SuccessToast'
import { useNavigate } from 'react-router'

const AddCrop = () => {
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth()
  const cropData = {
    createdAt: new Date(),
    interests: [],
    owner: {
      ownerName: user?.displayName,
      ownerEmail: user?.email,
    }
  }
  const [fromData, setFromData] = useState(cropData)
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFromData({ ...fromData, [name]: value })
  }
  const handleAddCrop = (event) => {
    event.preventDefault()
    axiosPublic.post('/add', fromData)
      .then(data => {
        if (data.data.insertedId) {
          SuccessToast('Added Successfully')
          event.target.reset()
          navigate('/my-posts')
        }
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  return (
    <>
      <div className="my-10">
        <div className="container">
          <div className="w-full max-w-3xl mx-auto">
            <div className="rounded-xl bg-white ring-1 ring-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden">
              <div className="px-8 pt-8 pb-4 text-center">
                <h2 className="text-3xl font-heading font-semibold  inline-block text-green-600">Add New Crop</h2>
                <p className="text-gray-500 mt-2">
                  List  agricultural item on the platform
                </p>
              </div>
              <form onSubmit={handleAddCrop} className="px-8 pb-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Name *</label>
                    <input onChange={handleOnChange} required name="name" placeholder="Enter crops name" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Type *</label>
                    <select required name="type" defaultValue="" onChange={handleOnChange} className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none bg-white focus:border-primary focus:ring-2 focus:ring-primary/40">
                      <option value="" disabled>Select type</option>
                      <option value="Vegetable">Vegetable</option>
                      <option value="Fruit">Fruit</option>
                      <option value="Grain">Grain</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Price per unit *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
                      <input required onChange={handleOnChange} name="pricePerUnit" placeholder="Enter price" className="w-full border border-gray-300 pl-7 pr-4 py-2.5 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"/>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Unit *</label>
                    <select required name="unit" onChange={handleOnChange} defaultValue="" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none bg-white focus:border-primary focus:ring-2 focus:ring-primary/40">
                      <option value="" disabled>Select unit</option>
                      <option value="kg">Kg</option>
                      <option value="ton">Ton</option>
                      <option value="bag">Bag</option>
                      <option value="piece">Piece</option>
                      <option value="dozen">Dozen</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Estimated quantity *</label>
                    <input required onChange={handleOnChange} name="quantity" placeholder="Enter quantity" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Location *</label>
                    <input required onChange={handleOnChange} name="location" placeholder="Enter location" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"/>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Image URL *</label>
                  <input required onChange={handleOnChange} name="image" type="url" placeholder="Enter crops photo URL" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"/>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-600">Description</label>
                  <textarea onChange={handleOnChange} name="description" rows={4} placeholder="Short details about the crop" className="w-full border border-gray-300 px-4 py-2.5 rounded-md outline-none resize-y focus:border-primary focus:ring-2 focus:ring-primary/40" />
                </div>
                <button
                  className="w-full rounded-md bg-linear-to-r from-green-400 to-green-600 cursor-pointer text-white py-2.5 duration-300 hover:brightness-105 transition-colors">Add Crop</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCrop