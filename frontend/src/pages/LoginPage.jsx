import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service.js'
import { Button, Typography } from '@material-tailwind/react'
import Swal from 'sweetalert2'
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
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authService.login(loginData)
      .then(response => {
        storeToken(response.data.token)
        authUser()
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response?.data?.message,
        })
        setLoginError(err.response?.data?.message)
      })
  }

  // Si se ha autenticado el usuario, se redirecciona a la pagina de empleados
  useEffect(() => {
    if (user) {
      if (user.userType === 'employee') {
        navigate('/bookings')
      } else if (user.userType === 'admin') {
        navigate('/admin')
      }
    }

  }, [user, navigate])

  const { username, password } = loginData

  return (
    <div className='h-screen w-screen flex items-center justify-center login overflow-hidden'>
      <div className='lg:grid lg:grid-cols-2 sm:w-full sm:h-full px-44 py-24 backdrop-blur-sm'>
        <form onSubmit={handleSubmit}
          className="flex flex-col h-2/3 justify-center items-center text-main_purple bg-main_green shadow-lg rounded-lg p-10
                     lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none lg:rounded-br-none lg:h-auto lg:w-auto lg:mt-0
                     md:mt-20"
        >
          <Typography variant='h2' className='mb-10'> Bienvenido! </Typography>
          <div className="flex flex-col gap-8 justify-center w-2/3 h-1/3 mb-5">
            <div className="flex flex-col gap-2">
              <label className="text-md font-bold">Username</label>
              <input type="text" name="username" value={username} onChange={handleInputChange}
                className="rounded-md px-3 py-2 leading-6 text-main_purple bg-secondary_purple focus:outline-none focus:ring-2 focus:ring-main_purple focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-md font-bold">Password</label>
              <input type="password" name="password" value={password} onChange={handleInputChange}
                className="rounded-md px-3 py-2 leading-6 text-main_purple bg-secondary_purple focus:outline-none focus:ring-2 focus:ring-main_purple focus:border-transparent"
              />
            </div>
          </div>
          <Button type="submit"
            className="flex w-2/3 justify-center bg-main_purple md:mt-10"
          >
            Log In
          </Button>
          {loginError && (<p className="text-red-500 font-bold">{loginError}</p>)}
        </form>
        <div className='lg:block lg:rounded-tr-lg lg:rounded-br-lg lg:bg-secondary_purple'></div>
      </div>
    </div>
  )
}

export default LoginPage