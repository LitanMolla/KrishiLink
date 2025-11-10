import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ErrorToast from '../../utils/ErrorToast'
import SuccessToast from '../../utils/SuccessToast'
import { Link, useLocation, useNavigate } from 'react-router'
import google from '/google.png'
import WarningToast from '../../utils/WarningToast'
const Login = () => {
  const { loginUser, user, googleLogin, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [inputEmail, setInputEmail] = useState('')
  useEffect(() => {
    if (user) {
      navigate(location.state || '/')
    }
  })
  const handleLogin = (event) => {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password)
      .then(result => {
        SuccessToast('Login successful')
        navigate(location.state || '/')
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        SuccessToast('Login successful')
        navigate(location.state || '/')
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  const handleResetPassword = () => {
    if (!inputEmail) {
      return WarningToast('Please enter email')
    }
    resetPassword(inputEmail)
      .then(result => {
        SuccessToast('Password reset email sent! Check your inbox')
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  return (
    <div>
      <div className="my-10">
        <div className="container">
          <div className="w-full container max-w-xl mx-auto bg-white p-10 rounded-lg shadow duration-300 hover:shadow-xl space-y-3 ">
            <form onSubmit={handleLogin} className='space-y-3'>
              <h2 className='text-4xl font-semibold text-center text-green-500'>Login User</h2>
              <div className="">
                <label>Email</label>
                <input defaultValue={inputEmail} onChange={(e) => setInputEmail(e.target.value)} required name='email' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="email" placeholder='Enter your email' />
              </div>
              <div className="">
                <label>Password</label>
                <input required name='password' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="password" placeholder='Enter your password' />
                <button onClick={handleResetPassword} type='button' className='text-green-600 cursor-pointer'>Forgot password?</button>
              </div>
              <input className='block text-center bg-linear-to-r hover:brightness-105 duration-300 from-green-400 to-green-600 rounded-md text-white w-full py-2.5 cursor-pointer' type="submit" value="Login" />
            </form>
            <button onClick={handleGoogleLogin} className='flex items-center text-green-600 justify-center gap-2 border w-full py-2.5 rounded-md cursor-pointer bg-gray-100 duration-300 hover:bg-green-100'><img className='w-5' src={google} alt="google" /><span>Login with Google</span></button>
            <p>Don't have an account? <Link to='/register' className='text-green-500 duration-300 hover:text-green-600'>Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login