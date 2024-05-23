import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'

const Navbar = ({backgroundColor, children, username}) => {
    const { logout } = useAuth()
    return (
        <nav className={`${backgroundColor} h-1/6 p-6 text-white flex flex-row items-center justify-between`}>
          {children}
        <div className='flex flex-col items-center gap-5 h-full mr-3'>
          <p className='font-bold text-lg'>{username}</p>
          <button
            className='bg-red-500 rounded-lg p-2 text-white w-26 h-8 text-sm flex items-center justify-center'
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    )
}

Navbar.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    username: PropTypes.string
}

export default Navbar
