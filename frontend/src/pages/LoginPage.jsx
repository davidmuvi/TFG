import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service.js'
function LoginPage() {
    const [loginData, setLoginData] = useState({
      username: '',
      password: ''
    })
    const navigate = useNavigate()
    const { authUser, storeToken } = useAuth()
    const {formState: {errors}} = useForm()
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setLoginData({...loginData, [name]: value})
    }
    const handleSubmitt = (e) => {
     e.preventDefault()
     authService.login(loginData)
     .then(response => {
      storeToken(response.data.token)
      authUser()
      navigate('/employees')
    })
    .catch(err => console.log(err))
  }

    // const onSubmit = handleSubmit(data => {
    //   signin(data)
    // })
    const {username, password} = loginData

    return (
      <div className='h-screen w-screen bg-indigo-900 flex items-center justify-center'>
        <form onSubmit={handleSubmitt} 
        className="w-2/5 h-96 flex flex-col justify-center items-center gap-10 text-white bg-indigo-400 rounded-xl"
        >
          <div className="w-2/3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Username</label>
                <input type="text" name="username" value={username} onChange={handleInputChange}
                className="rounded-md px-2 py-1 leading-8 text-black"
                />
                {errors.username && (<p className="text-red-500">Username required</p>)}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Password</label>
                <input type="password" name="password" value={password} onChange={handleInputChange}
                className="rounded-md px-2 py-1 leading-8 text-black"
                />
                {errors.username && (<p className="text-red-500">Password required</p>)}
              </div>
          </div>
              <button type="submit" 
              className="flex w-2/3 justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Log In
              </button>
        </form>
      </div>
    ) 
}

export default LoginPage;