import React from 'react'

const InterestTable = ({ interest }) => {
    const { status, quantity, ownerName, message, cropName, cropId } = interest || {};
    return (
        <tr className="hover:bg-gray-50 duration-150">
            <td className="py-3 px-4 font-medium">{cropName}</td>
            <td className="py-3 px-4">{ownerName}</td>
            <td className="py-3 px-4 text-center">{quantity}</td>
            <td className="py-3 px-4 text-gray-600">{message}</td>
            <td className="py-3 px-4 text-center">
                {
                    status == "pending" && <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Pending</span>
                    ||
                    status == 'accepted'
                    &&
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Accepted</span>
                    ||
                    status == 'rejected'
                    &&
                    <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Rejectted</span>
                }
            </td>
        </tr>
    )
}

export default InterestTable