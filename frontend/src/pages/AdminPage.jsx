import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/solid"
import { AdminPageCard } from "../components/AdminPageCard"
import { Button } from "@material-tailwind/react"
import { useAuth } from '../context/AuthContext'

function AdminPage() {
    const { logout } = useAuth()
    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full h-screen bg-gradient-to-br from-gray-200 to-gray-500">
            <div className="flex items-center justify-center gap-16 w-full">
            <AdminPageCard header='Gestionar empleados'
                paragraph='Desde aquí podrás gestionar facilmente a tus empleados.'
                icon={<UserIcon className="text-black w-10 h-10" />}
                buttonText="Empezar a gestionar empleados"
                redirection="/admin/manage-employees"
            />

            <AdminPageCard header='Gestionar restaurante'
                paragraph='Desde aquí podrás gestionar facilmente tu restaurante.'
                icon={<BriefcaseIcon className="text-black w-10 h-10" />}
                buttonText="Empezar a gestionar restaurante"
                redirection="/admin/manage-restaurant"
            />
            </div>

            <Button color='red' onClick={logout}>
                Logout
            </Button>
        </div>
    )
}

export default AdminPage