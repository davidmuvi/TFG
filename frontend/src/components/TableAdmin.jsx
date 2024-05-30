import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { Card, Typography } from "@material-tailwind/react"
import { employeeService } from "../services/employee.service"
import Swal from 'sweetalert2'
import { useState } from "react"
import ModifyEmployeeModal from './ModifyEmployeeModal'
import PropTypes from 'prop-types'

export function TableAdmin({ employees, getEmployees }) {
    const [open, setOpen] = useState(false)
    const [currentEmployee, setCurrentEmployee] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        telephone: ''
    })

    const TABLE_HEAD = ["Nombre", "Username", "Email", "Puesto", "Contratación", "Teléfono", ""]
    const TABLE_ROWS = employees

    const deleteEmployee = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Si borras el empleado, no podrás recuperar esta cuenta!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
            .then((response) => {
                if (response.isConfirmed) {
                    employeeService.deleteEmployee(id)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Empleado eliminado',
                                text: 'El empleado ha sido eliminado correctamente.',
                            })

                            getEmployees()
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Empleado no eliminado',
                                text: 'El empleado no se ha podido eliminar.',
                            })
                        })
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Cancelado',
                        text: 'No se ha eliminado el empleado.',
                    })
                }

            })

    }

    const handleOpen = (employee) => {
        setCurrentEmployee(employee)
        setOpen(true)
    }

    const updateEmployee = (id, updatedEmployee) => {
        employeeService.updateEmployee(id, updatedEmployee)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Empleado modificado',
                    text: 'El empleado ha sido modificado correctamente.',
                })

                getEmployees()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Empleado no modificado',
                    text: 'El empleado no se ha modificado correctamente.',
                })
            })
    }

    const formatDate = (date) => {
        const newDate = new Date(date.createdAt)
        return newDate.toLocaleDateString()
    }

    return (
        <Card className="flex-1 h-full w-screen p-4">
            <div className='grid grid-cols-7 gap-2 mb-4'>
                {TABLE_HEAD.map((head) => (
                    <div
                        key={head}
                        className="bg-main_purple rounded-3xl text-white text-2xl font-extrabold flex items-center justify-center p-2"
                    >
                        {head}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-7 gap-2 auto-rows-max'>
                {TABLE_ROWS.map(({ _id, name, username, email, role, createdAt, telephone }) => {
                    return (
                        <>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {name}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {username}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {email}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {role}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {formatDate({ createdAt })}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                {telephone}
                            </div>
                            <div className='bg-secondary_purple rounded-3xl p-2 flex justify-around'>
                                <Typography
                                    as="a"
                                    variant="small"
                                    className="cursor-pointer"
                                >
                                    <XCircleIcon className="w-6 h-6 text-red-500" onClick={() => deleteEmployee(_id)} />
                                </Typography>
                                <Typography
                                    as="a"
                                    variant="small"
                                    className="cursor-pointer"
                                >
                                    <PencilSquareIcon
                                        className="w-6 h-6 text-main_purple"
                                        onClick={() => handleOpen({ _id, name, username, email, role, telephone })}
                                    />
                                </Typography>
                            </div>
                        </>
                    )
                })}
            </div>
            {open && <ModifyEmployeeModal open={open} setOpen={setOpen} employee={currentEmployee} updateEmployee={updateEmployee} />}
        </Card>
    )
}

TableAdmin.propTypes = {
    employees: PropTypes.array.isRequired,
    getEmployees: PropTypes.func.isRequired,
}