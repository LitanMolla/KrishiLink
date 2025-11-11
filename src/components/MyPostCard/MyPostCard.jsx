import React, { useState } from 'react'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SuccessToast from '../../utils/SuccessToast';
import WarningToast from '../../utils/WarningToast';

const MyPostCard = ({ post, setPosts }) => {
    const axiosPublic = useAxiosPublic()
    const [openEditModal, setOpenEditModal] = useState(false);
    const [fromData, setFromData] = useState({})
    const { _id, name, type, pricePerUnit, unit, quantity, description, location, image, createdAt, interests, owner } = post || {};
    const handleOnChangeForm = (event) => {
        const { name, value } = event.target;
        setFromData({ ...fromData, [name]: value })
    }
    const handleEditSubmit = (event) => {
        event.preventDefault();
        axiosPublic.patch(`/my-crops/${_id}`, fromData)
            .then(data => {
                if (data.data.modifiedCount) {
                    SuccessToast('Updated successfully')
                    setOpenEditModal(false)
                    setPosts(prv => prv.map(item => item._id === _id ? { ...item, ...fromData } : item))
                }
            })
            .catch(error => {
                // console.log(error.message)
            })
    };
    const handleDelete = () => {
        axiosPublic.delete(`/my-crops/${_id}`)
        .then(data=>{
            if (data.data.deletedCount) {
                WarningToast('Post Deleted')
                setPosts(prv=>prv.filter(item=>item._id !== _id))
            }
        })
        .catch(error=>{
            // console.log(error.message)
        })
    }
    return (
        <>
            <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">
                    <img
                        src={image}
                        alt={name}
                        className="h-14 w-20 object-cover rounded-md ring-1 ring-gray-200"
                    />
                </td>
                <td className="py-3 px-4">
                    <div className="font-medium">{name}</div>
                    <div className="text-xs text-gray-500">Created: {createdAt}</div>
                </td>
                <td className="py-3 px-4">{type}</td>
                <td className="py-3 px-4 text-center capitalize">৳{pricePerUnit} / {unit}</td>
                <td className="py-3 px-4 text-center">{quantity}</td>
                <td className="py-3 px-4">{location}</td>
                <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-2">
                        <button onClick={() => setOpenEditModal(!openEditModal)} className="px-3 py-1.5 rounded-md text-white bg-green-600 hover:bg-green-700 cursor-pointer">Edit</button>
                        <button onClick={handleDelete} className="px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer">Delete</button>
                    </div>
                </td>
            </tr>
            {/* Edit Modal */}
            <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center duration-1000 transition-all ease-in-out ${openEditModal ? 'scale-100' : 'scale-0'}`}>
                <div className="w-full max-w-xl bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden animate-fadeIn">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-b-gray-400">
                        <h3 className="text-lg font-semibold">Edit Crop</h3>
                        <button onClick={() => setOpenEditModal(false)} className="text-gray-500 hover:text-gray-700 text-lg">✕</button>
                    </div>
                    <form onSubmit={handleEditSubmit} className="p-5 space-y-4 ">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Name</label>
                                <input type="text" name="name" defaultValue={name} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Type</label>
                                <select name="type" defaultValue={type} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600">
                                    <option value="Vegetable">Vegetable</option>
                                    <option value="Fruit">Fruit</option>
                                    <option value="Grain">Grain</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Price/Unit</label>
                                <input type="number" name="pricePerUnit" defaultValue={pricePerUnit} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Unit</label>
                                <select name="unit" defaultValue={unit} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600">
                                    <option value="kg">kg</option>
                                    <option value="ton">ton</option>
                                    <option value="bag">bag</option>
                                    <option value="piece">piece</option>
                                    <option value="dozen">dozen</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Quantity</label>
                                <input type="number" name="quantity" defaultValue={quantity} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Location</label>
                                <input name="location" defaultValue={location} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-600">Image URL</label>
                                <input name="image" defaultValue={image} onChange={handleOnChangeForm} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">Description</label>
                            <textarea name="description" defaultValue={description} onChange={handleOnChangeForm} rows="3" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none resize-none focus:border-green-600 focus:ring-1 focus:ring-green-600"></textarea>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setOpenEditModal(false)} className="px-4 py-2 rounded-md border hover:bg-gray-50 cursor-pointer">Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 cursor-pointer">Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default MyPostCard