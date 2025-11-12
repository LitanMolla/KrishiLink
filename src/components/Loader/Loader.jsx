import React from 'react'
import './Loader.css'
const Loader = () => {
    return (
        <div className='w-full flex justify-center items-center min-h-screen fixed inset-0 bg-black/50 z-50'>
            <div className="loader scale-200"></div>
        </div>
    )
}

export default Loader