import Layout from '../layouts/LayoutPages.jsx'
import { tableService } from '../services/table.service.js'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

function AddTablePage() {
    const [formData, setFormData] = useState({
        tableNumber: '',
        capacity: ''
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
        if (!formData.tableNumber) newErrors.tableNumber = 'El numero de la mesa es obligatorio'
        if (!formData.capacity) newErrors.capacity = 'La capacidad de la mesa es obligatoria'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createTable = async () => {
        const { tableNumber, capacity } = formData

        const newProvider = { tableNumber: Number(tableNumber), capacity: Number(capacity) }
        await tableService.createTable(newProvider)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            createTable()
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mesa creada',
                        text: 'La mesa se ha creado correctamente.',
                    })
                }
                )
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Mesa no creada',
                        text: 'No se ha podido crear la mesa.',
                    })
                }
                )

            setFormData({
                tableNumber: '',
                capacity: ''
            })
        }
    }

    return (
        <Layout>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <Typography variant="h4" className='text-center mb-6 text-blue-500'> Añadir mesa </Typography>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Numero de la mesa </Typography>
                        <Input
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.tableNumber && <Typography className='text-red-500 text-sm'>{errors.tableNumber}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Capacidad de la mesa </Typography>
                        <Input
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.capacity && <Typography className='text-red-500 text-sm'>{errors.capacity}</Typography>}
                    </div>

                    <Button type="submit" color="blue" className='w-full mt-4'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddTablePage