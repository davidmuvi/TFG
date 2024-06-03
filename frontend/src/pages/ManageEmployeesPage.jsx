import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NavbarAdmin } from '../components/NavbarAdmin'
import { TableAdmin } from '../components/TableAdmin'
import { useEffect, useState } from "react"
import { employeeService } from '../services/employee.service.js'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Spinner } from '@material-tailwind/react'

function ManageEmployeesPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        employeeService.getEmployees()
            .then((products) => {
                setEmployees(products.map(product => ({
                    ...product
                })))
                setLoading(false)
            })
            .catch(error => { console.error(error) })
    }

    if (user.userType !== 'admin') {
        navigate('/')
        return
    }

    return (
        <div className='min-h-screen w-screen flex flex-col'>
            <NavbarAdmin
                redirection='/admin/manage-employees/add'
                icon={<UserPlusIcon className="h-6 w-6" />}
                iconText='Añadir empleado'
            />
            {loading ?
                <div className='w-full flex-1 flex items-center justify-center'>
                    <Spinner className='h-12 w-12' />
                </div> :
                <TableAdmin employees={employees} getEmployees={getEmployees} />
            }
        </div>
    )
}

export default ManageEmployeesPage