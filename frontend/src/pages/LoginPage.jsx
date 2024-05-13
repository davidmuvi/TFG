import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const { signin, errors: loginErrors } = useAuth()
    const onSubmit = handleSubmit(data => {
      signin(data)
    })
    return (
        <form onSubmit={onSubmit} className="w-2/5 h-96 flex flex-col justify-center items-center gap-10 text-white">
          {
            loginErrors.map((error, index) => (
              <div className='bg-red-500 p-2 rounded-md' key={index}>
                {error}
              </div>
            ))
          }
          <div className="w-2/3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Username</label>
                <input type="text" name="username" {...register("username", {required: true})}
                className="rounded-md bg-slate-700 leading-8 border-2 border-slate-600"
                />
                {errors.username && (<p className="text-red-500">Username required</p>)}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Password</label>
                <input type="password" name="password" {...register("password", {required: true})}
                className="rounded-md bg-slate-700 leading-8 border-2 border-slate-600"
                />
                {errors.username && (<p className="text-red-500">Password required</p>)}
              </div>
          </div>
              <button type="submit" 
              className="flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Log In
              </button>
        </form>
      ) 
}

export default LoginPage;