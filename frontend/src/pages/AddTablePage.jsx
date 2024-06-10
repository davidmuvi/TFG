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

        try {
            if (tableNumber < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mesa no creada',
                    text: 'El número de la mesa debe ser mayor que 0.',
                })
                return
            }

            if (capacity < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mesa no creada',
                    text: 'La capacidad de la mesa debe ser mayor que 0.',
                })
                return
            }

            const newProvider = { tableNumber: Number(tableNumber), capacity: Number(capacity) }
            await tableService.createTable(newProvider)

            Swal.fire({
                icon: 'success',
                title: 'Mesa creada',
                text: 'La mesa se ha creado correctamente.',
            })

            setFormData({
                tableNumber: '',
                capacity: ''
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Mesa no creada',
                text: 'El número de mesa ya está asignado.',
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            createTable()
        }
    }

    return (
        <Layout>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit}
                    className='w-80 sm:w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg text-main_purple flex flex-col gap-6'
                >
                    <Typography variant="h4" className='text-center text-md sm:text-2xl mb-2'> Añadir mesa </Typography>

                    <Input
                        name="tableNumber"
                        value={formData.tableNumber}
                        onChange={handleChange}
                        color="purple"
                        label="Número de mesa"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.tableNumber && <Typography className='text-red-500 text-sm'>{errors.tableNumber}</Typography>}

                    <Input
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        color="purple"
                        label="Capacidad"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.capacity && <Typography className='text-red-500 text-sm'>{errors.capacity}</Typography>}


                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddTablePage