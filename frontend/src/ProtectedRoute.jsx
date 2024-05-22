import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
function ProtectedRoute() {
    const { loading, user } = useAuth()

    if (loading) return <h1>Loading...</h1>
    // Si el usuario no está autenticado, lo redirige a la página de login
    if (!user) return <Navigate to='/' />

    return (
        <Outlet />
    )
}

export default ProtectedRoute