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
        password: '',
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
        if (!formData.password) newErrors.password = 'La contraseña de usuario es obligatoria'
        if (!formData.email) newErrors.email = 'El email es obligatorio'
        if (!formData.role) newErrors.role = 'El puesto de trabajo es obligatorio'
        if (!formData.telephone) newErrors.telephone = 'El teléfono del empleado es obligatorio'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createEmployee = async () => {
        try {
            const { name, username, password, email, role, telephone } = formData
            const newEmployee = { name: name, username: username, password: password, email: email, role: role, telephone: Number(telephone) }
            await employeeService.createEmployee(newEmployee)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                createEmployee()

                Swal.fire({
                    icon: 'success',
                    title: 'Empleado creado',
                    text: 'El empleado se ha creado correctamente.',
                })

                setFormData({
                    name: '',
                    username: '',
                    email: '',
                    role: '',
                    telephone: ''
                })
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Empleado no creado',
                    text: 'No se ha podido crear el empleado.',
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
            <div className='flex-1 h-full w-full flex items-center justify-center py-4'>
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
                        <Typography variant="h6" className='mb-2'> Contraseña del empleado </Typography>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.password && <Typography className='text-red-500 text-sm'>{errors.password}</Typography>}
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