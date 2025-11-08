import useAuth from '../../hooks/useAuth'
import ErrorToast from '../../utils/ErrorToast'
import SuccessToast from '../../utils/SuccessToast'

const Register = () => {
    const { createUser, updateUser } = useAuth()

    const handleRegister = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUser(email, password)
            .then((result) => {
                SuccessToast('Register Successful')
                updateUser({ displayName: name, photoURL: photo })
            })
            .catch(error => {
                ErrorToast(error)
            })
    }
    return (
        <>
            <div className="my-10">
                <form onSubmit={handleRegister} className='w-full container space-y-3'>
                    <div className="">
                        <label>Name</label>
                        <input name='name' className='block border w-full px-5 py-2.5' type="text" placeholder='Enter your full name' />
                    </div>
                    <div className="">
                        <label>Photo</label>
                        <input name='photo' className='block border w-full px-5 py-2.5' type="url" placeholder='Enter your photo URL' />
                    </div>
                    <div className="">
                        <label>Email</label>
                        <input name='email' className='block border w-full px-5 py-2.5' type="email" placeholder='Enter your email' />
                    </div>
                    <div className="">
                        <label>Password</label>
                        <input name='password' className='block border w-full px-5 py-2.5' type="password" placeholder='Enter your password' />
                    </div>
                    <input className='block text-center bg-gray-200 w-full py-2.5 cursor-pointer' type="submit" value="Register" />
                </form>
            </div>
        </>
    )
}

export default Register