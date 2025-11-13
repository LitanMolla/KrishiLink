import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useAuth from '../../hooks/useAuth'
import SuccessToast from '../../utils/SuccessToast'
import Swal from 'sweetalert2'
import WarningToast from '../../utils/WarningToast'
import Loader from '../../components/Loader/Loader'

const CropDetails = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const axiosPublic = useAxiosPublic()
  const [pending, setPending] = useState(false)
  useEffect(() => {
    setPending(true)
    axiosPublic.get(`/crops/${id}`)
      .then(data => setCrop(data.data[0]))
      .catch(error => {
        // console.log(error.message)
      })
      .finally(() => setPending(false))
  }, [id])
  const [crop, setCrop] = useState({})
  const { _id, name, type, pricePerUnit, unit, quantity, description, location, image, createdAt, interests, owner } = crop;
  const ownerEmail = owner?.ownerEmail;
  const userEmail = user?.email;
  const matchEmail = userEmail === ownerEmail;
  const isSubmitted = interests?.some(item => item.userEmail === userEmail)
  const interestInfo = {
    cropId: id,
    userEmail,
    userName: user?.displayName,
    status: 'pending'
  }
  const [interestFrom, setInterestFrom] = useState(interestInfo)
  const interestFromOnchange = (event) => {
    const { name, value } = event.target;
    setInterestFrom({ ...interestFrom, [name]: value })
  }
  const handleInterestSubmit = (event) => {
    event.preventDefault()
    if (!interestFrom?.quantity) {
      return WarningToast('Please enter quantity')
    }
    Swal.fire({
      title: "Send Interest?",
      text: "The owner will be notified about your request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Send"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.post(`/interests/${id}`, interestFrom)
          .then(data => {
            if (data.data.modifiedCount === 1) {
              SuccessToast('Interest Submitted Successfully')
              setCrop({ ...crop, interests: [interestFrom] })
            }
            event.target.reset()
          })
          .catch(error => {
            // console.log(error.code)
          })
      }
    });
  }
  const handleChangeStatus = (status, userEmail, quantity, cropId, i) => {
    const payload = { status, userEmail, quantity };

    axiosPublic.patch(`/interests/${cropId}`, payload)
      .then(res => {
        if (res.data.success) {
          if (status === 'accepted') SuccessToast('Interest Accepted');
          if (status === 'rejected') WarningToast('Interest Rejected');
          setCrop(prev => {
            if (!prev) return prev;
            const newInterests = (prev.interests || []).map(item =>
              item.userEmail === userEmail && item.cropId === cropId
                ? { ...item, status }
                : item
            );
            let newQuantity = prev.quantity;
            if (status === 'accepted') {
              const prevQty = Number(prev.quantity) || 0;
              const dec = Number(quantity) || 0;
              newQuantity = Math.max(0, prevQty - dec); // don't go negative
            }
            return {
              ...prev,
              interests: newInterests,
              quantity: newQuantity
            };
          });
        }
      })
      .catch(err => console.log(err.message));
  };


  return (
    <>
      {
        pending ? <Loader /> :
          <section className='my-10'>
            <div className="container">
              {/* Details Part */}
              <div className="max-w-lg mx-auto group rounded-3xl overflow-hidden bg-white ring-1 ring-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={image}
                    alt={name}
                    className="w-full aspect-4/3 object-cover"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800 shadow">
                    {type}
                  </span>
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full bg-black/50 text-white backdrop-blur">
                    {location}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-heading font-semibold">
                      {name}
                    </h4>
                    <span className="px-4 py-1.5 from-green-300 rounded-xl text-white text-sm font-semibold bg-linear-to-r to-green-600 shadow-sm capitalize">
                      ৳{pricePerUnit}/{unit}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between">
                    <span className="px-3 py-1 text-xs font-medium rounded-full 
        bg-emerald-50 text-emerald-700">
                      Location: {location}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full 
        bg-blue-50 text-blue-700">
                      Type: {type}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full 
        bg-amber-50 text-amber-700 capitalize">
                      Available: {quantity} {unit}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm text-center"><b>Owner:</b> {owner?.ownerName}</p>
                  <p className="text-gray-700 leading-relaxed text-sm text-center"><b>Description:</b> {description}</p>
                </div>
              </div>
              {/* Details Part End */}
              {/* Interested Submit part */}
              {!matchEmail && (
                <form onSubmit={handleInterestSubmit} className="mt-8 p-6 rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm space-y-4 max-w-lg mx-auto duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-semibold text-primary text-center">Send Interest</h3>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600 capitalize">Quantity ({unit})</label>
                    <input name='quantity' onChange={interestFromOnchange} type="number" min='1' placeholder="Enter quantity" className="w-full border border-gray-300 focus:border-primary rounded-xl px-3 py-2 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Message</label>
                    <textarea required name='message' onChange={interestFromOnchange} placeholder="Write something..." rows="3" className="w-full border border-gray-300 focus:border-primary rounded-xl px-3 py-2 outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="text-center font-semibold text-gray-800 text-sm">
                    {
                      interestFrom?.quantity
                      &&
                      <>
                        <p className='capitalize text-gray-500'>Price: {pricePerUnit} Per {unit}</p>
                        <p className='capitalize text-gray-500'>Quantity: {interestFrom?.quantity} {unit}</p>
                      </>
                    }
                    <p>Total Price:  {
                      interestFrom?.quantity
                      &&
                      <span className='text-green-600'>৳{pricePerUnit * interestFrom?.quantity}</span>
                    }</p>
                  </div>
                  <button disabled={isSubmitted} className="bg-green-500 block py-2 text-white duration-300 hover:bg-green-600 border border-green-500 rounded-md w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:border-0">
                    Submit Interest
                  </button>
                  {isSubmitted && <p className='text-center text-yellow-500'>You've already sent an interest</p>}
                </form>
              )}
              {/* Interested Submit part end */}
              {/* Received Interests */}
              {matchEmail && (
                <div className="mt-8 max-w-5xl mx-auto">
                  <h3 className="text-xl font-semibold text-primary mb-3">Received Interests</h3>
                  {(!Array.isArray(crop?.interests) || crop.interests.length === 0) ? (
                    <div className="rounded-lg bg-white ring-1 ring-gray-200 p-6 text-gray-600">
                      No interests yet.
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-x-auto bg-white ring-1 ring-gray-200">
                      <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                          <tr className="text-left">
                            <th className="py-3 px-4">Buyer Name</th>
                            <th className="py-3 px-4">Quantity</th>
                            <th className="py-3 px-4">Message</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crop.interests.map((i, index) => {
                            const pill =
                              i.status === "accepted"
                                ? "bg-green-100 text-green-700 capitalize"
                                : i.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700 capitalize";
                            return (
                              <tr key={index} className="border-t border-t-gray-300">
                                <td className="py-3 px-4">{i.userName}</td>
                                <td className="py-3 px-4 capitalize">{i.quantity} {crop?.unit}</td>
                                <td className="py-3 px-4">{i.message || "-"}</td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${pill}`}>
                                    {i.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 space-x-2">
                                  {i.status === 'pending' ? <><button onClick={() => handleChangeStatus('accepted', i.userEmail, i.quantity, i.cropId, i)} className="px-3 py-1 rounded-lg bg-green-500 text-white disabled:opacity-50 cursor-pointer"> Accept</button>
                                    <button onClick={() => handleChangeStatus('rejected', i.userEmail, i.quantity, i.cropId, i)} className="px-3 py-1 rounded-lg bg-red-500 text-white disabled:opacity-50 cursor-pointer" disabled={i.status !== "pending"} title="Reject">Reject</button></>
                                    : <span className='text-gray-500'>Actions Completed</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
      }

    </>
  )
}

export default CropDetails