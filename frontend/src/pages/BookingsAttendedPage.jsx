import { useEffect, useState } from 'react'
import { bookingAttendedService } from '../services/booking_attended.service.js'
import { clientService } from '../services/client.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon } from '@heroicons/react/24/solid'

function BookingsAttendedPage() {
    const [bookings, setBookings] = useState([])

    const TABLE_HEAD = ["Empleado", "Fecha reserva", "Nombre cliente", "Telefono cliente", "Email cliente", ""]
    const TABLE_ROWS = bookings

    // Al entrar por primera vez se ejecuta para cargar las reservas.
    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = async () => {
        try {
            // Consigo todas las reservas atendidas, y después consigo también los datos del cliente asociado a esa reserva.
            const bookings = await bookingAttendedService.getBookingsAttended()

            // Como bookings.map me devuelve un array de promesas, utilizo Promise.all para que resuelva esas promesas.
            const bookingsWithClientData = await Promise.all(bookings.map(async (booking) => {
                const client = await clientService.getClientById(booking.bookingId.clientId)
                return {
                    ...booking,
                    client
                }
            }))

            setBookings(bookingsWithClientData)
        } catch (error) {
            console.error(error)
        }
    }

    const formatDate = (date) => {
        const newDate = new Date(date)
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
                        {TABLE_ROWS.map(({ _id, employeeId, bookingId, client }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

                            const employeeName = employeeId && employeeId.name ? employeeId.name : 'No existe el empleado'
                            const bookingDate = bookingId && bookingId.date ? bookingId.date : 'No existe la fecha'

                            {/* Compruebo que el cliente existe, si existe asigno sus datos sino un mensaje de error.
                                No debería haber nunca una reserva sin cliente, pero al usar una base de datos no relacional
                                puede haber algún error en caso de un mal uso. */ }
                            const clientInfo = client || {
                                name: 'No existe el cliente',
                                telephone: 'No existe el cliente',
                                email: 'No existe el cliente'
                            }

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {employeeName}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {formatDate(bookingDate)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {clientInfo.name}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {clientInfo.telephone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {clientInfo.email}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50 h-full flex items-center justify-center`}>
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6">
                                            <XCircleIcon className='w-6 h-6 text-red-500' />
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
                                            NO HAY RESERVAS ATENDIDAS
                                        </Typography>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Card>
        </Layout>
    )
}

export default BookingsAttendedPage