import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

function ModifyBookingModal({ open, setOpen, booking, updateBooking }) {
    const [formData, setFormData] = useState({
        bookingDay: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateBooking(booking, { 
            date: formData.bookingDay 
        })
        setOpen(false)
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-blue-500'>Modificar reserva</Typography>
                        <XMarkIcon className='text-black cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2'>Día de la reserva</Typography>
                        <Input 
                            type="date"
                            name="bookingDay"
                            value={formData.bookingDay}
                            onChange={handleChange}
                            className='w-full'
                        />
                    </div>
                    <Button type="submit" color="blue" className='w-full mt-4'>Guardar</Button>
                </form>
            </div>
        </Dialog>
    )
}

{/* Declaramos los tipos de las propiedades que le pasan al componente */}
ModifyBookingModal.propTypes = { 
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    updateBooking: PropTypes.func.isRequired
}
export default ModifyBookingModal