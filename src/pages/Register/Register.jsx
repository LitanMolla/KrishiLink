import { Link, useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'
import ErrorToast from '../../utils/ErrorToast'
import SuccessToast from '../../utils/SuccessToast'
import { useState } from 'react'
import google from '/google.png'
const Register = () => {
    const { createUser, updateUser, googleLogin } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleRegister = (event) => {
        event.preventDefault()
        setError('')
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setError('Password must contain at least 1 uppercase, 1 lowercase, 1 number, and be at least 6 characters long.')
        }
        createUser(email, password)
            .then((result) => {
                SuccessToast('Register Successful')
                navigate('/')
                updateUser({ displayName: name, photoURL: photo })
            })
            .catch(error => {
                ErrorToast(error)
            })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                SuccessToast('Login Successful')
                navigate('/')
            })
            .catch(error => {
                ErrorToast(error)
            })
    }
    return (
        <>
            <div className="my-10">
                <div className="w-full container max-w-xl mx-auto bg-white p-10 rounded-lg shadow duration-300 hover:shadow-xl space-y-3">
                    <form onSubmit={handleRegister} className='w-full  space-y-3'>
                        <h2 className='text-4xl font-semibold text-center text-green-500'>Register User</h2>
                        <div className="">
                            <label>Name</label>
                            <input name='name' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="text" placeholder='Enter your full name' />
                        </div>
                        <div className="">
                            <label>Photo</label>
                            <input name='photo' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="url" placeholder='Enter your photo URL' />
                        </div>
                        <div className="">
                            <label>Email</label>
                            <input name='email' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="email" placeholder='Enter your email' />
                        </div>
                        <div className="">
                            <label>Password</label>
                            <input name='password' className='block border w-full px-5 py-2.5 rounded-md border-gray-300' type="password" placeholder='Enter your password' />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>
                        <input className='block text-center bg-linear-to-r hover:brightness-105 duration-300 from-green-400 to-green-600 rounded-md text-white w-full py-2.5 cursor-pointer' type="submit" value="Register" />
                    </form>
                    <button onClick={handleGoogleLogin} className='flex items-center text-green-600 justify-center gap-2 border w-full py-2.5 rounded-md cursor-pointer bg-gray-100 duration-300 hover:bg-green-100'><img className='w-5' src={google} alt="google" /><span>Login with Google</span></button>
                    <p>Alredy have an account? <Link to='/login' className='text-green-500 duration-300 hover:text-green-600'>Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register