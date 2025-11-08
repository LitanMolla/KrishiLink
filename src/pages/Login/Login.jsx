import React from 'react'
import useAuth from '../../hooks/useAuth'
import ErrorToast from '../../utils/ErrorToast'
import SuccessToast from '../../utils/SuccessToast'

const Login = () => {
  const { loginUser } = useAuth()
  const handleLogin = (event) => {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    loginUser(email, password)
      .then(result => {
        SuccessToast('Login successful')
      })
      .catch(error => {
        ErrorToast(error)
      })
  }
  return (
    <div>
      <div className="my-10">
        <div className="container">
          <form onSubmit={handleLogin} className='w-full container space-y-3'>

            <div className="">
              <label>Email</label>
              <input name='email' className='block border w-full px-5 py-2.5' type="email" placeholder='Enter your email' />
            </div>
            <div className="">
              <label>Password</label>
              <input name='password' className='block border w-full px-5 py-2.5' type="password" placeholder='Enter your password' />
            </div>
            <input className='block text-center bg-gray-200 w-full py-2.5 cursor-pointer' type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login