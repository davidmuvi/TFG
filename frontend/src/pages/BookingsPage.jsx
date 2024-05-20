import { useEffect, useState } from 'react'
import { bookingService } from '../services/booking.service.js'
import Layout from '../layouts/LayoutPages'
import ModifyBookingModal from '../components/ModifyBookingModal'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'

function BookingsPage() {
    const [bookings, setBookings] = useState([])
    const [open, setOpen] = useState(false)
    const [currentBooking, setCurrentBooking] = useState({ name: '', telephone: '', bookingDay: '' })

    const TABLE_HEAD = ["Cliente", "Teléfono", "Fecha", ""]
    const TABLE_ROWS = bookings

    // Al entrar por primera vez y cada vez que hay un cambio en las reservas, se ejecuta para cargar las reservas.
    useEffect(() => {
        getBookings()
    }, [bookings])

    const handleOpen = (booking) => {
        setCurrentBooking(booking)
        setOpen(true)
    }

    const getBookings = () => { 
        bookingService.getBookings()
        .then((bookings) => {
            setBookings(bookings.map(booking => ({
                ...booking
            })))
        })
        .catch(error => {console.error(error)})  
    }

    const deleteBooking = (bookingId) => { 
        try {
            bookingService.deleteBooking(bookingId)
        } catch (error) { 
            Swal.fire({
                icon: 'error',
                title: 'Reserva no eliminada',
                text: 'La reserva no se ha podido eliminar',
            })
        }
    }

    const updateBooking = (id, updatedBooking) => {
        bookingService.updateBooking(id, updatedBooking)
        .then(() => {
            Swal.fire({
                icon:'success',
                title: 'Reserva modificada',
                text: 'La reserva se ha modificado correctamente.',
            })
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Reserva no modificada',
                text: error.message,
            })
        })
    }

    const formatDate = (date) => { 
        const newDate = new Date(date.date)
        return newDate.toLocaleDateString()
    }

    return (
        <Layout>
        <Card className="flex-1 w-screen">
            <table className="w-full h-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                        variant="small"
                        color="blue-gray"
                        className="leading-none opacity-70 font-bold"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {TABLE_ROWS.map(({ _id, clientId, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

                    {/* Compruebo que el cliente existe, si existe asigno sus datos sino un mensaje de error.*/}
                    const clientName = clientId && clientId.name ? clientId.name : 'No existe el cliente'
                    const clientTelephone = clientId && clientId.telephone ? clientId.telephone : 'No existe el cliente'

                    return (
                    <tr key={_id}>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {clientName}
                            </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {clientTelephone}
                            </Typography>
                        </td>
                        <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {formatDate({date})}
                            </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50 h-full flex items-center justify-around`}>
                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteBooking(_id)}>
                                <XCircleIcon className='w-6 h-6 text-red-500'/>
                            </Typography>

                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => handleOpen(_id, date)}>
                                <PencilSquareIcon className='w-6 h-6 text-black'/>
                            </Typography>
                        </td>
                    </tr>
                    )
                })}

                {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                {
                    TABLE_ROWS.length === 0 && (
                    <tr>
                        <td colSpan={TABLE_HEAD.length} className="p-4">
                        <Typography variant="h5" color="blue-gray" className="font-normal">
                            NO HAY RESERVAS REGISTRADAS
                        </Typography>
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </Card>
        {open && <ModifyBookingModal open={open} setOpen={setOpen} booking={currentBooking} updateBooking={updateBooking} />}
    </Layout>
    )
}

export default BookingsPage