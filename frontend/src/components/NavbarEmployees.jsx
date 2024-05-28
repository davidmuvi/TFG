import { Link } from 'react-router-dom'
import {
    Button,
    Collapse,
    IconButton,
    Navbar
} from "@material-tailwind/react"
import MenuDefault from './Menu'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const NavbarEmployees = () => {
    const [openNav, setOpenNav] = useState(false)
    const { user, logout } = useAuth()

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        )
    }, [])

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12 text-black">
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
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 hover:text-white"
                >
                    Gestionar empleados
                    <ArrowRightCircleIcon className="h-6 w-6" />
                </Link>
            }
        </ul>
    )


    return (
        <Navbar className="px-2 py-2 lg:px-8 lg:py-4 w-screen !max-w-full">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <div className="hidden lg:block">{navList}</div>
                <div className="flex items-center gap-x-1">
                    <Button
                        color="red"
                        className="hidden lg:inline-block"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button
                            variant="gradient"
                            color="red"
                            size="sm"
                            className="lg:inline-block"
                            onClick={logout}
                        >
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </Collapse>
        </Navbar>
    )
}

NavbarEmployees.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
}

export default NavbarEmployees