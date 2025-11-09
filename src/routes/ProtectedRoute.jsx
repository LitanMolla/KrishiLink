import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />
  }
}

export default ProtectedRoute;