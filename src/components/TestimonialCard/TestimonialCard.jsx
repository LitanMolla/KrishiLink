import React from 'react'

const TestimonialCard = ({ testimonial }) => {
    const { image, message, role, name } = testimonial || {}
    // console.log(testimonial)
    return (
        <div className="bg-gray-100 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-green-200 group-hover:ring-green-400 transition">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-600 text-sm italic leading-relaxed mb-4">“{message}”</p>
            <h4 className="text-base font-semibold text-gray-800">{name}</h4>
            <p className="text-xs text-green-600 font-medium mt-1">{role}</p>
        </div>
    )
}

export default TestimonialCard