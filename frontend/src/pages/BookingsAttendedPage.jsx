import { useEffect, useState } from 'react'
import { bookingAttendedService } from '../services/booking_attended.service.js'
import { clientService } from '../services/client.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"

function BookingsAttendedPage() {
    const [bookings, setBookings] = useState([])

    const TABLE_HEAD = ["Empleado", "Fecha reserva", "Nombre cliente", "Telefono cliente", "Email cliente"]
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
            <Card className="flex-1 w-screen p-4">
                <div className='grid grid-cols-5 gap-2 mb-4'>
                    {TABLE_HEAD.map((head) => (
                        <div
                            key={head}
                            className="bg-main_purple rounded-3xl text-white text-2xl font-extrabold flex items-center justify-center p-2"
                        >
                            {head}
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-5 gap-2 auto-rows-max'>
                    {TABLE_ROWS.map(({ employeeId, bookingId, client }) => {
                        const employeeName = employeeId && employeeId.name ? employeeId.name : 'Empleado borrado'
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
                            <>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {employeeName}
                                    </Typography>
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {formatDate(bookingDate)}
                                    </Typography>
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {clientInfo.name}
                                    </Typography>
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {clientInfo.telephone}
                                    </Typography>
                                </div>
                                <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center text-main_purple font-bold'>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {clientInfo.email}
                                    </Typography>
                                </div>
                            </>
                        )
                    })}

                    {/* Si no hay datos en la base de datos, mostramos un mensaje indicándolo.*/}
                    {
                        TABLE_ROWS.length === 0 && (
                            <tr>
                                <td className="p-4 col-span-5">
                                    <Typography variant="h5" className="font-normal text-main_purple">
                                        NO HAY RESERVAS ATENDIDAS
                                    </Typography>
                                </td>
                            </tr>
                        )
                    }
                </div>
            </Card>
        </Layout >
    )
}

export default BookingsAttendedPage