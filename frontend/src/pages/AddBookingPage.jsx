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
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'El nombre del cliente es obligatorio';
        if (!formData.telephone) newErrors.telephone = 'El teléfono del cliente es obligatorio';
        if (!formData.bookingDay) newErrors.bookingDay = 'El día de la reserva es obligatorio';	
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const createBooking = async () => {
        const { telephone, bookingDay } = formData;
        const client = await clientService.getClientByTelephone(telephone)
        
        if (!client) { 
            Swal.fire({
                icon: 'error',
                title: 'Usuario no existe',
                text: 'No se encontró un cliente con el número de teléfono proporcionado.',
            })
            return
        }

        const newBooking = { clientId: client._id , date: bookingDay };
        await bookingService.createBooking(newBooking)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                createBooking() 

                Swal.fire({
                    icon:'success',
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
    };

    return (
        <Layout> 
            <div className='flex-1 w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg'>
                    <Typography variant="h4" className='text-center mb-6 text-blue-500'> Añadir reserva </Typography>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Nombre del cliente </Typography>
                        <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.name && <Typography className='text-red-500 text-sm'>{errors.name}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Teléfono del cliente </Typography>
                        <Input 
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.telephone && <Typography className='text-red-500 text-sm'>{errors.telephone}</Typography>}
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'> Día de la reserva </Typography>
                        <Input 
                            type="date"
                            name="bookingDay"
                            value={formData.bookingDay}
                            onChange={handleChange}
                            className='w-full'
                        />
                        {errors.bookingDay && <Typography className='text-red-500 text-sm'>{errors.bookingDay}</Typography>}
                    </div>

                    <Button type="submit" color="blue" className='w-full mt-4'>Añadir</Button>
                </form>
            </div>
        </Layout>
    )
}

export default AddBookingPage