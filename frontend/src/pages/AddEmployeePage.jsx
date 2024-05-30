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
        const { name, username, password, email, role, telephone } = formData
        const newEmployee = { name: name, username: username, password: password, email: email, role: role, telephone: telephone }
        await employeeService.createEmployee(newEmployee)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            createEmployee()
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Empleado creado',
                        text: 'El empleado se ha creado correctamente.',
                    })

                    setFormData({
                        name: '',
                        username: '',
                        password: '',
                        email: '',
                        role: '',
                        telephone: ''
                    })
                })

                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Empleado no creado',
                        text: 'No se ha podido crear el empleado.',
                    })
                })
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
                <form
                    onSubmit={handleSubmit}
                    className='w-80 sm:w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg text-main_purple flex flex-col gap-6'
                >
                    <Typography variant="h4" className='text-center text-md sm:text-2xl mb-2'> Añadir empleado </Typography>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        color="purple"
                        label="Nombre del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        color="purple"
                        label="Username del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.username && <Typography className='text-red-500 text-sm'>{errors.username}</Typography>}

                    <Input
                        type='password'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        color="purple"
                        label="Password del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.password && <Typography className='text-red-500 text-sm'>{errors.password}</Typography>}

                    <Input
                        type='email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        color="purple"
                        label="Email del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.email && <Typography className='text-red-500 text-sm'>{errors.email}</Typography>}

                    <Input
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        color="purple"
                        label="Puesto del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.role && <Typography className='text-red-500 text-sm'>{errors.role}</Typography>}

                    <Input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        color="purple"
                        label="Teléfono del empleado"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.telephone && <Typography className='text-red-500 text-sm'>{errors.telephone}</Typography>}

                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Añadir</Button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeePage