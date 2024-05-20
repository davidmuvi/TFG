import { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/auth.service.js'

export const AuthContext = createContext()

export const useAuth = () => { 
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authUser()
    }, [])

    const storeToken = (token) => {
        localStorage.setItem('ACCESS_TOKEN', token)
    }    

    const removeToken = () => { 
        localStorage.removeItem('ACCESS_TOKEN')
    }

    const logout = () => { 
        setLoading(false)
        setUser(null)
        removeToken()
    }

    const authUser = () => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        if (token) {
            authService
            .verifyToken(token)
            .then(
                ({data}) => {
                    setUser(data)
                    setLoading(false)
                }
            )
            .catch(err => console.log(err))
        }
        else {
            logout()
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, authUser, storeToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}