import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return
  }
  if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to='/login' />
  }
}

export default ProtectedRoute;