import { employeeService } from '../services/employee.service.js'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { NavbarAdmin } from '../components/NavbarAdmin.jsx'
import { UserIcon } from '@heroicons/react/24/solid'
import { Button, Typography, Input } from '@material-tailwind/react'

function AddEmployeePage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        role: '',
        telephone: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'El nombre del empleado es obligatorio'
        if (!formData.username) newErrors.username = 'El nombre de usuario es obligatorio'
        if (!formData.email) newErrors.email = 'El email es obligatorio'
        if (!formData.role) newErrors.role = 'El puesto de trabajo es obligatorio'
        if (!formData.telephone) newErrors.telephone = 'El teléfono del empleado es obligatorio'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createEmployee = async () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                createEmployee()

                Swal.fire({
                    icon: 'success',
                    title: 'Reserva creada',
                    text: 'La reserva se ha creado correctamente.',
                })

                setFormData({
                    name: '',
                    telephone: '',
                    bookingDay: ''
                })
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Reserva no creada',
                    text: 'No se ha podido crear la reserva.',
                })
            }
        }
    }

    return (
        <div className='min-h-screen w-screen flex flex-col'>
            <NavbarAdmin
                redirection='/admin/manage-employees'
                icon={<UserIcon className="h-6 w-6" />}
                iconText='Ver empleados'
            />
            <div className='flex-1 h-full w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <Typography variant="h4" className='text-center mb-6 text-gray-900'> Añadir empleado </Typography>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Nombre del empleado </Typography>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Username del empleado </Typography>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.username && <Typography className='text-red-500 text-sm'>{errors.username}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Email del empleado </Typography>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.email && <Typography className='text-red-500 text-sm'>{errors.email}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Puesto del empleado </Typography>
                        <Input
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.role && <Typography className='text-red-500 text-sm'>{errors.role}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Teléfono del empleado </Typography>
                        <Input
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.telephone && <Typography className='text-red-500 text-sm'>{errors.telephone}</Typography>}
                    </div>

                    <Button type="submit" className='w-full mt-4'>Añadir</Button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeePage