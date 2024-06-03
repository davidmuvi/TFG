import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

function ModifyEmployeeModal({ open, setOpen, employee, updateEmployee }) {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        telephone: ''
    })

    // Cuando cargamos el modal, ponemos en el formulario los datos de la reserva que queremos modificar.
    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                username: employee.username,
                email: employee.email,
                role: employee.role,
                telephone: employee.telephone
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateEmployee(employee._id, {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            role: formData.role,
            telephone: formData.telephone
        })
        setOpen(false)
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-main_purple'>Modificar empleado</Typography>
                        <XMarkIcon className='text-main_purple cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'> Nombre del empleado </Typography>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'> Username del empleado </Typography>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'> Email del empleado </Typography>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'> Puesto del empleado </Typography>
                        <Input
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'> Teléfono del empleado </Typography>
                        <Input
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Guardar</Button>
                </form>
            </div>
        </Dialog>
    )
}

{/* Declaramos los tipos de las propiedades que le pasan al componente */ }
ModifyEmployeeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    updateEmployee: PropTypes.func.isRequired
}
export default ModifyEmployeeModal