import { useEffect, useState } from "react"
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { ArrowRightCircleIcon, UserIcon } from "@heroicons/react/24/solid"
import { useAuth } from "../context/AuthContext"
import PropTypes from 'prop-types'

export function NavbarAdmin({ redirection, icon, iconText }) {
    const [openNav, setOpenNav] = useState(false)
    const { user, logout } = useAuth()
    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        )
    }, [])

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-40 text-main_purple font-bold">
            <Typography
                as="li"
                variant="small"
                className="flex items-center gap-x-2 p-1"
            >
                <Link to={redirection}
                    className="font-bold flex items-center gap-2 p-2 rounded-lg hover:text-white hover:bg-main_purple"
                >
                    {iconText}
                    {icon}
                </Link>
            </Typography>

            <Typography
                as="li"
                variant="small"
                className="flex items-center gap-x-2 p-1"
            >
                <Link to='/bookings'
                    className="font-bold flex items-center gap-2 p-2 rounded-lg hover:text-white hover:bg-main_purple"
                >
                    Gestionar restaurante
                    <ArrowRightCircleIcon className="h-6 w-6" />
                </Link>
            </Typography>
        </ul>
    )

    return (
        <Navbar className="px-2 py-2 lg:px-8 lg:py-4 w-screen !max-w-full bg-main_green">
            <div className="w-full px-3 flex items-center justify-between">
                <div className="hidden lg:flex lg:items-center lg:justify-center h-full w-2/3">{navList}</div>
                <div className="flex items-center justify-end gap-10 w-1/3">
                    <div className="hidden lg:flex lg:gap-3 lg:items-center lg:p-2 lg:border-secondary_purple lg:border-2 lg:rounded-md">
                        <p className='font-bold text-main_purple'>{user.username} </p>
                        <UserIcon className='w-6 h-6 text-main_purple' />
                    </div>
                    <Button
                        className="hidden lg:flex bg-main_purple text-secondary_purple"
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
                    <div className="flex items-center justify-end gap-10 w-1/3">
                    <div className="text-main_purple flex gap-3 items-center p-2 border-secondary_purple border-2 rounded-md">
                        <p className='font-bold'>{user.username} </p>
                        <UserIcon className='w-6 h-6' />
                    </div>
                    <Button
                        className="lg:flex bg-main_purple text-secondary_purple"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>
                </div>
            </Collapse>
        </Navbar>
    )
}

NavbarAdmin.propTypes = {
    redirection: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    iconText: PropTypes.string.isRequired,
}