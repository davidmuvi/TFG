import { Dialog, Input, Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { tableService } from '../services/table.service'
import Swal from 'sweetalert2'

function ModifyBookingModal({ open, setOpen, booking, updateBooking }) {
    const [formData, setFormData] = useState({
        bookingDay: '',
        tableNumber: ''
    })

    // Cuando cargamos el modal, ponemos en el formulario los datos de la reserva que queremos modificar.
    useEffect(() => {
        if (booking) {
            setFormData({
                bookingDay: booking.date
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
        if (formData.tableNumber) {
            tableService.getTableByTableNumber(formData.tableNumber)
                .then((table) => {
                    if (table) {
                        updateBooking(booking.id, {
                            date: formData.bookingDay,
                            tableId: table._id
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Reserva no modificada',
                            text: 'La mesa asignada no existe',
                        })
                    }
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Reserva no modificada',
                        text: 'La mesa asignada no existe',
                    })
                })
            setOpen(false)
        } else {
            // Consigo la fecha actual.
            let actualDate = new Date()
            const actualDay = String(actualDate.getDate()).padStart(2, '0')
            const actualYear = actualDate.getFullYear()
            const actualMonth = String(actualDate.getMonth() + 1).padStart(2, '0')

            actualDate = new Date(`${actualYear}-${actualMonth}-${actualDay}`)
            const bookingDate = new Date(formData.bookingDay)

            // Si la fecha de la reserva es anterior a la fecha actual, no se puede realizar la reserva.
            if (bookingDate < actualDate) {
                setOpen(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Reserva no modificada',
                    text: 'La reserva no se ha podido modificar. La fecha de la reserva debe ser posterior a la actual.',
                })
                return
            }

            updateBooking(booking.id, {
                date: formData.bookingDay
            })
            setOpen(false)
        }
    }

    return (
        <Dialog size="xs" open={open} handler={() => setOpen(!open)} className='bg-transparent shadow-none'>
            <div className='flex-1 w-full flex items-center justify-center'>
                <form className='w-full max-w-md bg-secondary_purple p-6 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    <div className='flex justify-between items-center mb-6'>
                        <Typography variant="h4" className='text-center text-main_purple'>Modificar reserva</Typography>
                        <XMarkIcon className='text-main_purple cursor-pointer w-6 h-6' onClick={() => setOpen(false)} />
                    </div>
                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'>Día de la reserva</Typography>
                        <Input
                            type="date"
                            name="bookingDay"
                            value={formData.bookingDay}
                            onChange={handleChange}
                            labelProps={{
                                className: "!text-main_purple after:border-main_purple before:border-main_purple peer-focus:before:!border-main_purple peer-focus:after:!border-main_purple",
                            }}
                            className='w-full text-main_purple border-main_purple focus:border-main_purple'
                        />
                    </div>

                    <div className='mb-4'>
                        <Typography variant="h6" className='mb-2 text-main_purple'>Asignar numero de mesa</Typography>
                        <Input
                            type="number"
                            name="tableNumber"
                            value={formData.tableNumber}
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

// Declaramos los tipos de las propiedades que le pasan al componente
ModifyBookingModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    updateBooking: PropTypes.func.isRequired
}
export default ModifyBookingModal