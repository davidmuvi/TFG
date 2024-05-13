import { createContext, useState, useContext, useEffect } from 'react'
import { loginRequest } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const signin = async (user) => {
        try {
            const response = await loginRequest(user)
            console.log(response)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    // Si se ha mostrado un error, lo borra después de 3 segundos
    useEffect(() => { 
        if (errors.length > 0) { 
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            // Cuando el usuario cambia de página, se elimina el timer
            return () => clearTimeout(timer)
        }
    }, [errors])


    return (
        <AuthContext.Provider value={{signin, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    )
}