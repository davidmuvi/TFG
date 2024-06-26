import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/solid"
import { AdminPageCard } from "../components/AdminPageCard"
import { Button } from "@material-tailwind/react"
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

function AdminPage() {
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    if (user.userType !== 'admin') {
        navigate('/')
        return
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full h-screen bg-gradient-to-br from-main_purple to-main_green">
            <div
                className="flex flex-col gap-2 w-full items-center sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-16 sm:w-full"
            >
                <AdminPageCard header='Gestionar empleados'
                    paragraph='Desde aquí podrás gestionar facilmente a tus empleados.'
                    icon={<UserIcon className="text-main_purple w-10 h-10" />}
                    buttonText="Empezar a gestionar empleados"
                    redirection="/admin/manage-employees"
                />

                <AdminPageCard header='Gestionar restaurante'
                    paragraph='Desde aquí podrás gestionar facilmente tu restaurante.'
                    icon={<BriefcaseIcon className="text-main_purple w-10 h-10" />}
                    buttonText="Empezar a gestionar restaurante"
                    redirection="/bookings"
                />
            </div>

            <Button className="bg-main_purple" onClick={logout}>
                Logout
            </Button>
        </div>
    )
}

export default AdminPage