import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
  const {user,loading} = useAuth()
  const navigate = useNavigate()
  if (!user) {
    return navigate('/login')
  }
  if (loading) {
    return <p>Loading...</p>
  }
  return children;
}

export default ProtectedRoute;