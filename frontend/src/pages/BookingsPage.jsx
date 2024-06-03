import { useEffect, useState } from 'react'
import { bookingService } from '../services/booking.service.js'
import { bookingAttendedService } from '../services/booking_attended.service.js'
import { useAuth } from '../context/AuthContext'
import Layout from '../layouts/LayoutPages'
import ModifyBookingModal from '../components/ModifyBookingModal'
import OrderModal from '../components/OrderModal'
import { Card, Spinner, Typography } from "@material-tailwind/react"
import { XCircleIcon, PencilSquareIcon, CheckCircleIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

function BookingsPage({ bookings, setBookings }) {
    const [open, setOpen] = useState(false)
    const [openOrderModal, setOpenOrderModal] = useState(false)
    const [currentBooking, setCurrentBooking] = useState({ name: '', telephone: '', bookingDay: '' })
    const [currentBookingOrder, setCurrentBookingOrder] = useState('')
    const [loading, setLoading] = useState(true)

    const { user } = useAuth()
    const TABLE_HEAD = ["Cliente", "Teléfono", "Fecha", "Numero de mesa", ""]
    const TABLE_ROWS = bookings

    // Al entrar por primera vez se ejecuta para cargar las reservas.
    useEffect(() => {
        getBookings()
    }, [])

    const handleOpen = (booking) => {
        setCurrentBooking(booking)
        setOpen(true)
    }

    const handleOpenOrderModal = (bookingId) => {
        setCurrentBookingOrder(bookingId)
        setOpenOrderModal(true)
    }

    const getBookings = () => {
        bookingService.getBookings()
            .then((bookings) => {
                bookingAttendedService.getBookingsAttended()
                    .then((bookingsAttended) => {
                        const attendedBookingIds = bookingsAttended.map(bookingAttended => bookingAttended.bookingId._id)
                        const notAttendedBookings = bookings.filter(booking => !attendedBookingIds.includes(booking._id))

                        setBookings(notAttendedBookings)
                        setLoading(false)
                    })
            })
            .catch(error => { console.error(error) })
    }

    const deleteBooking = (bookingId) => {
        bookingService.deleteBooking(bookingId)
            .then(() => {
                getBookings()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Reserva no eliminada',
                    text: 'La reserva no se ha podido eliminar',
                })
            })
    }

    const updateBooking = (id, updatedBooking) => {
        bookingService.updateBooking(id, updatedBooking)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva modificada',
                    text: 'La reserva se ha modificado correctamente.',
                })
                getBookings()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Reserva no modificada',
                    text: 'No se ha podido modificar la reserva',
                })
            })
    }

    const attendBooking = (bookingId, employeeId) => {
        bookingAttendedService.createBookingAttended({
            bookingId: bookingId,
            employeeId: employeeId
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva atendida',
                    text: 'La reserva se ha atendido correctamente.',
                })

                getBookings()
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Reserva no atendida',
                    text: 'La reserva no se ha podido atender',
                })
            })
    }

    const formatDate = (date) => {
        const newDate = new Date(date.date)
        return newDate.toLocaleDateString()
    }

    return (
        <Layout>
            {loading ?
                <div className='w-full flex-1 flex items-center justify-center'>
                    <Spinner className='h-12 w-12' />
                </div> :
                <Card className="flex-1 w-screen p-4">
                    <div className='grid grid-cols-5 gap-2 mb-4'>
                        {TABLE_HEAD.map((head) => (
                            <div
                                key={head}
                                className="text-xs text-center font-medium bg-main_purple rounded-3xl text-white md:text-base lg:text-2xl md:font-extrabold flex items-center justify-center p-2"
                            >
                                {head}
                            </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-5 gap-2 auto-rows-max'>
                        {TABLE_ROWS.map(({ _id, clientId, tableId, date }) => {
                            {/* Compruebo que el cliente existe, si existe asigno sus datos sino un mensaje de error.*/ }
                            const clientName = clientId && clientId.name ? clientId.name : 'No existe el cliente'
                            const clientTelephone = clientId && clientId.telephone ? clientId.telephone : 'No existe el cliente'
                            const tableNumber = tableId && tableId.tableNumber ? tableId.tableNumber : 'Mesa no asignada'

                            return (
                                <>
                                    <div className='text-xs md:text-base bg-secondary_purple rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {clientName}
                                    </div>
                                    <div className='text-xs md:text-base bg-secondary_purple rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {clientTelephone}
                                    </div>
                                    <div className='text-xs md:text-base bg-secondary_purple rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {formatDate({ date })}
                                    </div>
                                    <div className='text-xs md:text-base bg-secondary_purple text-center rounded-3xl p-2 flex items-center justify-center text-main_purple font-bold'>
                                        {tableNumber}
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex flex-col md:flex-row items-center justify-around'>
                                        <Typography className="font-medium w-6 h-6 cursor-pointer"
                                            onClick={() => handleOpen({ id: _id, date: new Date(date).toLocaleDateString })}
                                        >
                                            <PencilSquareIcon className='w-5 h-5 md:w-6 md:h-6 text-main_purple' />
                                        </Typography>

                                        <Typography className="font-medium w-6 h-6 cursor-pointer"
                                            onClick={() => handleOpenOrderModal(_id)}
                                        >
                                            <ClipboardDocumentListIcon className='w-5 h-5 md:w-6 md:h-6 text-main_purple' />
                                        </Typography>

                                        {user.userType !== 'admin' &&
                                            <Typography className="font-medium w-6 h-6 cursor-pointer"
                                                onClick={
                                                    () => tableId && tableId.tableNumber
                                                        ? attendBooking(_id, user.id)
                                                        : Swal.fire({
                                                            icon: 'error',
                                                            title: 'Reserva no atendida',
                                                            text: 'La reserva debe tener una mesa asignada para poder atenderla.',
                                                        })
                                                }
                                            >
                                                <CheckCircleIcon className='w-5 h-5 md:w-6 md:h-6 text-green-500' />
                                            </Typography>
                                        }

                                        <Typography className="font-medium w-6 h-6 cursor-pointer"
                                            onClick={() => deleteBooking(_id)}
                                        >
                                            <XCircleIcon className='w-5 h-5 md:w-6 md:h-6 text-red-500' />
                                        </Typography>
                                    </div>
                                </>
                            )
                        })}

                        {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                        {
                            TABLE_ROWS.length === 0 && (
                                <>
                                    <div className="p-4 col-span-5">
                                        <Typography variant="h5" className="font-normal text-main_purple">
                                            NO HAY RESERVAS REGISTRADAS
                                        </Typography>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Card>}
            {open && <ModifyBookingModal open={open} setOpen={setOpen} booking={currentBooking} updateBooking={updateBooking} />}
            {openOrderModal && <OrderModal openOrderModal={openOrderModal} setOpenOrderModal={setOpenOrderModal} bookingId={currentBookingOrder} />}
        </Layout>
    )
}

BookingsPage.propTypes = {
    bookings: PropTypes.array.isRequired,
    setBookings: PropTypes.func.isRequired,
}

export default BookingsPage