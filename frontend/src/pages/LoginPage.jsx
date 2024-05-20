import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service.js'
function LoginPage() {
    const [loginData, setLoginData] = useState({
      username: '',
      password: ''
    })

    const [loginError, setLoginError] = useState(null)

    const navigate = useNavigate()
    const { authUser, storeToken, user } = useAuth()

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setLoginData({...loginData, [name]: value})
    }

    const handleSubmit = (e) => {
     e.preventDefault()
     authService.login(loginData)
     .then(response => {
        storeToken(response.data.token)
        authUser()
    })
    .catch(err => {
      setLoginError(err.response?.data?.message)
    })
  }

  // Si se ha autenticado el usuario, se redirecciona a la pagina de empleados
    useEffect(() => {
      if (user) {
        navigate('/employees')
      }
    }, [user, navigate])

    const {username, password} = loginData

    return (
      <div className='h-screen w-screen bg-blue-200 flex items-center justify-center'>
        <form onSubmit={handleSubmit} 
        className="w-2/5 h-96 flex flex-col justify-center items-center gap-10 text-black bg-white rounded-xl shadow-lg p-8"
        >
          <div className="w-2/3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Username</label>
                <input type="text" name="username" value={username} onChange={handleInputChange}
                className="rounded-md px-3 py-2 leading-6 text-black bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Password</label>
                <input type="password" name="password" value={password} onChange={handleInputChange}
                className="rounded-md px-3 py-2 leading-6 text-black bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
          </div>
          {loginError && (<p className="text-red-500 font-bold">{loginError}</p>)}
              <button type="submit" 
              className="flex w-2/3 justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600"
              >
                Log In
              </button>
        </form>
      </div>
    ) 
}

export default LoginPage