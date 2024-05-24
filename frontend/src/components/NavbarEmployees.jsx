import { Link } from 'react-router-dom'
import MenuDefault from './Menu'
import Navbar from './Navbar'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'

const NavbarEmployees = ({ backgroundColor }) => {
    const { user } = useAuth()

    return (
        <Navbar backgroundColor={backgroundColor} username={user.username}>
            <Link to='/'>
                <img src="src/images/logo.png" alt="Logo" className='w-20 h-20 rounded-lg' />
            </Link>

            <MenuDefault
                redirection='/bookings'
                menuName='Bookings'
                items={[
                    { name: 'Añadir reserva', redirection: '/bookings/add' },
                    { name: 'Ver reservas atendidas', redirection: '/bookings_attended' }
                ]}
            />

            <MenuDefault
                redirection='/products'
                menuName='Products'
                items={[
                    { name: 'Añadir producto', redirection: '/products/add' }
                ]}
            />

            <MenuDefault
                redirection='/providers'
                menuName='Providers'
                items={[
                    { name: 'Añadir proveedor', redirection: '/providers/add' }
                ]}
            />

            <MenuDefault
                redirection='/tables'
                menuName='Tables'
                items={[
                    { name: 'Añadir mesa', redirection: '/tables/add' }
                ]}
            />

            {user.userType === 'admin' &&
                <Link to='/admin/manage-employees'
                    className="flex items-center gap-2 p-2 mt-10 rounded-lg hover:bg-gray-800 hover:text-white"
                >
                    Gestionar empleados
                    <ArrowRightCircleIcon className="h-6 w-6" />
                </Link>
            }
        </Navbar>
    )
}

NavbarEmployees.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
}

export default NavbarEmployees