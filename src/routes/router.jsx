import { createBrowserRouter } from 'react-router'
import Root from '../layouts/Root/Root'
import NotFound from '../pages/NotFound/NotFound'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import AddCrop from '../pages/AddCrop/AddCrop'
import ProtectedRoute from './ProtectedRoute'
import AllCrops from '../pages/AllCrops/AllCrops'
import CropDetails from '../pages/CropDetails/CropDetails'
import MyInterests from '../pages/MyInterests/MyInterests'
import MyPosts from '../pages/MyPosts/MyPosts'
import Profile from '../pages/Profile/Profile'

const router = createBrowserRouter([
    {
        path:'/',
        Component: Root,
        errorElement: <NotFound/>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'add-crops',
                element: <ProtectedRoute><AddCrop/></ProtectedRoute>
            },
            {
                path: 'all-crops',
                Component: AllCrops
            },
            {
                path: 'corp-details',
                element: <ProtectedRoute><CropDetails/></ProtectedRoute>
            },
            {
                path: 'my-interests',
                element: <ProtectedRoute><MyInterests/></ProtectedRoute>
            },
            {
                path: 'my-posts',
                element: <ProtectedRoute><MyPosts/></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute><Profile/></ProtectedRoute>
            }
        ]
    }
])
export default router