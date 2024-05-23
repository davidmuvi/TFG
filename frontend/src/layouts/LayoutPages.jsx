import NavbarEmployees from '../components/NavbarEmployees'
import PropTypes from 'prop-types'

const Layout = ({ navbarBackgroundColor, children }) => {
  return (
    <div className='min-h-screen w-screen flex flex-col'>
      <NavbarEmployees backgroundColor={navbarBackgroundColor || 'bg-gray-700'}/>
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navbarBackgroundColor: PropTypes.string,
}

export default Layout