import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { Card, Typography } from "@material-tailwind/react"
import { employeeService } from "../services/employee.service"
import Swal from 'sweetalert2'
import { useState } from "react"
import ModifyEmployeeModal from './ModifyEmployeeModal'

export function TableAdmin({ employees, getEmployees }) {
    const [open, setOpen] = useState(false)
    const [currentEmployee, setCurrentEmployee] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        telephone: ''
    })

    const TABLE_HEAD = ["Nombre", "Username", "Email", "Puesto", "Fecha de creación", "Teléfono", ""]
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
        <Card className="flex-1 h-full w-screen">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map(({ _id, name, username, email, role, createdAt, telephone }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

                        return (
                            <tr key={_id}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {username}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {role}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {formatDate({ createdAt })}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {telephone}
                                    </Typography>
                                </td>
                                <td className={`${classes} h-full flex items-center justify-around`}>
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
                                            className="w-6 h-6 text-black"
                                            onClick={() => handleOpen({ _id, name, username, email, role, telephone })}
                                        />
                                    </Typography>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ModifyEmployeeModal open={open} setOpen={setOpen} employee={currentEmployee} updateEmployee={updateEmployee}/>
        </Card>
    )
}