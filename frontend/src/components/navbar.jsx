import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { user } = useAuth()
    return (
        <>
        <nav className="bg-indigo-600 h-1/6 p-6 text-white flex items-center justify-between">
            <Link to='/employees'>
            <img src="" alt="Logo" />
            </Link>

            <Link to='/bookings' className="flex items-center mt-10 opacity-60 p-2 rounded-xl hover:bg-indigo-800 hover:opacity-100 focus:bg-indigo-800 focus:opacity-100 mb-9">
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    <p> Bookings </p>
                </div>
            </Link>

            <Link to='/products' className="flex mt-10 opacity-60 p-2 rounded-xl hover:bg-indigo-800 hover:opacity-100 focus:bg-indigo-800 focus:opacity-100 mb-9">
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                    </svg>
                    <p> Products </p>
                </div>
            </Link>

            <Link to='/providers' className="flex mt-10 opacity-60 p-2 rounded-xl hover:bg-indigo-800 hover:opacity-100 focus:bg-indigo-800 focus:opacity-100 mb-9">
                <div className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                    <p> Providers </p>
                </div>
            </Link>

            <Link to='/tables' className="flex mt-10 opacity-60 p-2 rounded-xl hover:bg-indigo-800 hover:opacity-100 focus:bg-indigo-800 focus:opacity-100 mb-9">
                <div className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m6.5 18.725l1-2.475q.225-.575.725-.913T9.35 15H11v-4.025Q7.175 10.85 4.587 9.85T2 7.5q0-1.45 2.925-2.475T12 4q4.175 0 7.088 1.025T22 7.5q0 1.35-2.588 2.35T13 10.975V15h1.65q.6 0 1.113.338t.737.912l1 2.475q.2.45-.088.863t-.787.412q-.275 0-.5-.15t-.35-.425L14.8 17H9.2l-.975 2.425q-.125.275-.35.425t-.5.15q-.5 0-.787-.413t-.088-.862M12 9q2.425 0 4.575-.425t3.15-1.075q-1-.65-3.15-1.075T12 6t-4.575.425T4.275 7.5q1 .65 3.15 1.075T12 9m0-1.5"/>
                </svg>
                    <p> Tables </p>
                </div>
            </Link>

            <div className='gap-3 h-full w-48'>
                <p className='absolute right-3 top-20 font-bold text-lg'> {user.email} </p>
                <button 
                className='absolute right-3 top-3 bg-red-500 rounded-lg p-2 text-white w-26 h-8 text-sm flex items-center justify-center'>
                    Logout
                </button>

            </div>
        </nav>   
        </>
    )
}

export default Navbar