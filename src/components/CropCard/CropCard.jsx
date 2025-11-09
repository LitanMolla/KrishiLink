import React from 'react'
import { Link } from 'react-router';

const CropCard = ({crop}) => {
    const { _id, name, type, pricePerUnit, unit, quantity, description, location, image, createdAt, interests, owner } = crop;
  return (
    <div className='bg-white text-center border border-gray-300 duration-300 hover:shadow-lg hover:shadow-gray-300 space-y-1'>
        <img className='w-full h-80 object-cover' src={image} alt={name} />
        <h4 className='text-2xl font-semibold'>{name}</h4>
        <p className='capitalize'>৳{pricePerUnit} - {unit}</p>
        <p className='capitalize'>{quantity} {unit} Available</p>
        <Link to={`/corp-details/${_id}`} className='link'>View Details</Link>
    </div>
  )
}

export default CropCard