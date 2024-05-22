import { useEffect, useState } from 'react'
import { bookingAttendedService } from '../services/booking_attended.service.js'
import { clientService } from '../services/client.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon } from '@heroicons/react/24/solid'

function BookingsAttendedPage() {
    const [bookings, setBookings] = useState([])
    const [clientName, setClientName] = useState('No existe el cliente');
    const [clientTelephone, setClientTelephone] = useState('El cliente no tiene telefono')
    const [clientEmail, setClientEmail] = useState('El cliente no tiene email')

    const TABLE_HEAD = ["Empleado", "Fecha reserva", "Nombre cliente", "Telefono cliente", "Email cliente", ""]
    const TABLE_ROWS = bookings

    // Al entrar por primera vez se ejecuta para cargar las reservas.
    useEffect(() => {
        getBookings()
    }, [])

    const getBookings = () => {
        bookingAttendedService.getBookingsAttended()
            .then((bookings) => {
                setBookings(bookings.map(booking => ({
                    ...booking
                })))
            })
            .catch(error => { console.error(error) })
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
                        {TABLE_ROWS.map(({ _id, employeeId, bookingId }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"
                            
                            if (bookingId.clientId){
                                clientService.getClientById(bookingId.clientId)
                                .then ((client) => {
                                    client.name && setClientName(client.name)
                                    client.telephone && setClientTelephone(client.telephone)
                                    client.email && setClientEmail(client.email)
                                })
                                .catch ((error) => {
                                    console.error(error)
                                })
                            }

                            {/* Compruebo que el cliente existe, si existe asigno sus datos sino un mensaje de error.*/ }
                            const employeeName = employeeId && employeeId.name ? employeeId.name : 'No existe el empleado'
                            const bookingDate = bookingId && bookingId.date ? bookingId.date : 'No existe la fecha'
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
                                            {clientEmail}
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