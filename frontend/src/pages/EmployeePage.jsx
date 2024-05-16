import { useAuth } from '../context/AuthContext'
import { Typography, Button } from "@material-tailwind/react";
import { EmployeePageCard } from '../components/EmployeePageCard';
import { BookOpenIcon } from '@heroicons/react/24/solid';
function EmployeePage() {
    const { user, logout } = useAuth()

    return (
        <div className='bg-gray-200 h-screen w-screen flex flex-col items-center justify-center'>
            <Typography variant="h1" className='mb-10'> Bienvenido {user.username}!</Typography>
            <div className='flex items-center justify-center gap-10 w-full'>
                <EmployeePageCard redirection='/bookings' icon={ <BookOpenIcon className='w-12 h-12'/> }>
                    <Typography variant="h5">Reservas</Typography>
                </EmployeePageCard>
                <EmployeePageCard redirection='/products' icon={ <BookOpenIcon className='w-12 h-12'/> }>
                    <Typography variant="h5">Productos</Typography>
                </EmployeePageCard>
                <EmployeePageCard redirection='/tables' icon={ <BookOpenIcon className='w-12 h-12'/> }>
                    <Typography variant="h5">Mesas</Typography>
                </EmployeePageCard>
                <EmployeePageCard redirection='/providers' icon={ <BookOpenIcon className='w-12 h-12'/> }>
                    <Typography variant="h5">Proveedores</Typography>
                </EmployeePageCard>
            </div>
            <Button color="red" className='mt-10' onClick={logout}>Logout</Button>
        </div>
    )
}

export default EmployeePage