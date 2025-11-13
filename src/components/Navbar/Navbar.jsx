import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { FaBars, FaWindowClose } from 'react-icons/fa'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out",
              text: "You have been logged out successfully.",
              icon: "success",
              confirmButtonColor: "#16a34a"
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong!",
              icon: "error"
            });
          });
      }
    });
  };
  const navMenu = <>
    <li><NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Home</NavLink></li>
    <li><NavLink to='/all-crops' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>All Crops</NavLink></li>
    {
      user
      &&
      <>
        <li><NavLink to='/profile' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Profile</NavLink></li>
        <li><NavLink to='/add-crops' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>Add Crops</NavLink></li>
        <li><NavLink to='/my-posts' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>My Posts</NavLink></li>
        <li><NavLink to='/my-interests' className={({ isActive }) => isActive ? 'text-green-600' : 'text-gray-900'}>My Interests</NavLink></li>
      </>
    }
  </>
  return (
    <>
      <nav className='bg-gray-100 py-3 shadow-xl sticky top-0 z-50'>
        <div className="container flex justify-between items-center">
          <Link to='/' className='text-2xl font-semibold block'><span className='text-green-600'>Krishi</span>Link</Link>
          <ul className='lg:flex gap-5 hidden'>
            {navMenu}
          </ul>
          <div className="hidden lg:block">
            {
              user
                ?
                <button onClick={handleLogout} className='text-white bg-linear-to-r from-green-400 to-green-600 px-6 py-2.5 block duration-300 hover:brightness-105 rounded-md cursor-pointer'>Logout</button>
                :
                <Link to='/login' className='text-white bg-linear-to-r from-green-400 to-green-600 px-6 py-2.5 block duration-300 hover:brightness-105 rounded-md'>Login</Link>
            }
          </div>
          {/* bar for mobile menu */}
          <button onClick={() => setIsOpen(!isOpen)} className='text-2xl lg:hidden cursor-pointer'> {isOpen ?  <FaWindowClose />:<FaBars /> } </button>
        </div>
      </nav>
      {/* mobile menu */}
      <ul className={`${isOpen ? 'top-14' : '-top-60'} fixed z-20 w-full bg-gray-100 py-5 lg:hidden duration-1000 shadow-xl`}>
        <div className="container text-center space-y-1">
          {navMenu}
          <div className="flex justify-center mt-5">
            {
              user
                ?
                <button onClick={handleLogout} className='text-white bg-linear-to-r from-green-400 to-green-600 px-6 py-2.5 block duration-300 hover:brightness-105 rounded-md cursor-pointer'>Logout</button>
                :
                <Link to='/login' className='text-white bg-linear-to-r from-green-400 to-green-600 px-6 py-2.5 block duration-300 hover:brightness-105 rounded-md'>Login</Link>
            }
          </div>
        </div>
      </ul>
    </>
  )
}

export default Navbar