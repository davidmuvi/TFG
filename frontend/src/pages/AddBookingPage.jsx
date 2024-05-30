import Layout from '../layouts/LayoutPages.jsx'
import { bookingService } from '../services/booking.service.js'
import { clientService } from '../services/client.service.js'
import { Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import Swal from 'sweetalert2'

function AddBookingPage() {
    const [formData, setFormData] = useState({
        name: '',
        telephone: '',
        bookingDay: ''
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
        if (!formData.name) newErrors.name = 'El nombre del cliente es obligatorio'
        if (!formData.telephone) newErrors.telephone = 'El teléfono del cliente es obligatorio'
        if (!formData.bookingDay) newErrors.bookingDay = 'El día de la reserva es obligatorio'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createBooking = async () => {
        const { telephone, bookingDay } = formData
        const client = await clientService.getClientByTelephone(telephone)

        if (!client) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario no existe',
                text: 'No se encontró un cliente con el número de teléfono proporcionado.',
            })
            return
        }

        const newBooking = { clientId: client._id, date: bookingDay }
        await bookingService.createBooking(newBooking)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            try {
                createBooking()

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
        <Layout>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit}
                    className='w-80 sm:w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg text-main_purple flex flex-col gap-6'
                >
                    <Typography variant="h4" className='text-center text-md sm:text-2xl mb-2'> Añadir reserva </Typography>

                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        color="purple"
                        label="Nombre del cliente"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}

                    <Input
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        color="purple"
                        label="Teléfono del cliente"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.telephone && <Typography className='text-red-500 text-sm'>{errors.telephone}</Typography>}

                    <Input
                        type="date"
                        name="bookingDay"
                        value={formData.bookingDay}
                        onChange={handleChange}
                        color="purple"
                        label="Fecha de la reserva"
                        labelProps={{
                            className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                        }}
                        className='text-main_purple border-main_purple placeholder-shown:border placeholder-shown:border-main_purple placeholder-shown:border-t-main_purple focus:border-main_purple'
                    />
                    {errors.bookingDay && <Typography className='text-red-500 text-sm'>{errors.bookingDay}</Typography>}


                    <Button type="submit" className='w-full mt-4 bg-main_purple'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddBookingPage