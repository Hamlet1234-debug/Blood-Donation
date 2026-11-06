import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../routes'

export function ProtectedRoute({ children }) {
	const { user, loading } = useAuth()
	if (loading) return <div className="page" style={{ padding: 40 }}>Loading...</div>
	return user ? children : <Navigate to={ROUTES['login']} replace />
}

export function AdminRoute({ children }) {
	const { user, isAdmin, loading } = useAuth()
	if (loading) return <div className="page" style={{ padding: 40 }}>Loading...</div>
	if (!user) return <Navigate to={ROUTES['login']} replace />
	return isAdmin ? children : <Navigate to={ROUTES['donor-dash']} replace />
}
