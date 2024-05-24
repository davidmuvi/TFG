import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { NavbarAdmin } from '../components/NavbarAdmin'
import { TableAdmin } from '../components/TableAdmin'
import { useEffect, useState } from "react"
import { employeeService } from '../services/employee.service.js'

function ManageEmployeesPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        employeeService.getEmployees()
            .then((products) => {
                setEmployees(products.map(product => ({
                    ...product
                })))
            })
            .catch(error => { console.error(error) })
    }

    if (user.userType !== 'admin') {
        navigate('/')
        return
    }

    return (
        <div className='min-h-screen w-screen flex flex-col'>
            <NavbarAdmin />
            <TableAdmin employees={employees} getEmployees={getEmployees}/>
        </div>
    )
}

export default ManageEmployeesPage