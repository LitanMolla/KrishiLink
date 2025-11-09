import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='bg-gray-100/80 backdrop-blur-2xl py-3 shadow-sm sticky top-0 z-50'>
      <div className="container flex justify-between items-center">
        <Link to='/' className='text-2xl font-semibold block'><span className='text-green-600'>Krishi</span>Link</Link>
        <ul className='lg:flex gap-5 hidden'>
          <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Home</NavLink></li>

          <li><NavLink to='/all-crops' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>All Crops</NavLink></li>

          <li><NavLink to='/profile' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Profile</NavLink></li>

          <li><NavLink to='/add-crops' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Add Crops</NavLink></li>

          <li><NavLink to='/my-posts' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>My Posts</NavLink></li>
          <li><NavLink to='/my-interests' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>My Interests</NavLink></li>

          <li><NavLink to='/login' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Login</NavLink></li>
          <li><NavLink to='/register' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Register</NavLink></li>

        </ul>
      </div>
    </nav>
  )
}

export default Navbar