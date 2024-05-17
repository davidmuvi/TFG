import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { MenuDefault } from './Menu'

const Navbar = () => {
    const { user, logout } = useAuth()
    return (
        <nav className="bg-blue-400 h-1/6 p-6 text-white flex items-center justify-between">
            <Link to='/employees'>
            <img src="" alt="Logo" />
            </Link>

            <MenuDefault 
                redirection='/bookings' 
                menuName='Bookings' 
                items={[
                    {name:'Añadir reserva', redirection: '/bookings/add'}, 
                    {name:'Modificar reserva', redirection: '/bookings/edit'}
                ]} 
            />

            <MenuDefault 
                redirection='/products' 
                menuName='Products' 
                items={[
                    {name:'Añadir producto', redirection: '/products/add'}, 
                    {name:'Modificar producto', redirection: '/products/edit'}
                ]} 
            />

            <MenuDefault 
                redirection='/providers' 
                menuName='Providers' 
                items={[
                    {name:'Añadir proveedor', redirection:'/providers/add'}, 
                    {name:'Modificar proveedor', redirection:'/providers/edit'}
                ]} 
            />

            <MenuDefault 
                redirection='/tables' 
                menuName='Tables' 
                items={[
                    {name:'Añadir mesa', redirection: '/tables/add'}, 
                    {name:'Modificar mesa', redirection: '/tables/edit'}
                ]} 
            />

            <div className='gap-3 h-full w-48'>
                <p className='absolute right-3 top-20 font-bold text-lg'> {user.email} </p>
                <button 
                className='absolute right-3 top-3 bg-red-500 rounded-lg p-2 text-white w-26 h-8 text-sm flex items-center justify-center'
                onClick={logout}
                >
                    Logout
                </button>

            </div>
        </nav>
    )
}

export default Navbar
