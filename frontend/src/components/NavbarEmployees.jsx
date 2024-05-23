import { Link } from 'react-router-dom'
import MenuDefault from './Menu'
import Navbar from './Navbar'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'

const NavbarEmployees = ({backgroundColor}) => {
    const { user } = useAuth()

    return (
        <Navbar backgroundColor={backgroundColor} username={user.username}>
            <Link to='/employees'>
                <img src="" alt="Logo" />
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
        </Navbar>
    )
}

NavbarEmployees.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
}

export default NavbarEmployees