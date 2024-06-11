import { useEffect, useState } from 'react'
import { bookingAttendedService } from '../services/booking_attended.service.js'
import { clientService } from '../services/client.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Spinner, Typography } from "@material-tailwind/react"

function BookingsAttendedPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

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
            setLoading(false)
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
            {loading ?
                <div className='w-full flex-1 flex items-center justify-center'>
                    <Spinner className='h-12 w-12' />
                </div> :
                <Card className="flex-1 w-screen p-4">
                    <div className='grid grid-cols-4 lg:grid-cols-5 gap-2 mb-4'>
                        {TABLE_HEAD.map((head) => {
                            if (head != 'Email cliente') {
                                return <div
                                    key={head}
                                    className="bg-main_purple rounded-3xl text-white text-sm text-center md:text-2xl md:font-extrabold flex items-center justify-center p-2"
                                >
                                    {head}
                                </div>
                            } else {
                                return <div
                                    key={head}
                                    className="bg-main_purple rounded-3xl text-white text-sm text-center md:text-2xl md:font-extrabold hidden lg:flex items-center justify-center p-2"
                                >
                                    {head}
                                </div>
                            }
                        })}
                    </div>
                    <div className='grid grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-max'>
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
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center items-center'>
                                        <Typography variant="small" color="blue-gray" className="text-main_purple">
                                            {employeeName}
                                        </Typography>
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center items-center'>
                                        <Typography variant="small" color="blue-gray" className="text-main_purple">
                                            {formatDate(bookingDate)}
                                        </Typography>
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center items-center text-center'>
                                        <Typography variant="small" color="blue-gray" className="text-main_purple">
                                            {clientInfo.name}
                                        </Typography>
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 flex justify-center items-center text-center'>
                                        <Typography variant="small" color="blue-gray" className="text-main_purple">
                                            {clientInfo.telephone}
                                        </Typography>
                                    </div>
                                    <div className='bg-secondary_purple rounded-3xl p-2 hidden lg:flex justify-center items-center'>
                                        <Typography variant="small" color="blue-gray" className="text-main_purple">
                                            {clientInfo.email}
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
                                            NO HAY RESERVAS ATENDIDAS
                                        </Typography>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Card>
            }
        </Layout >
    )
}

export default BookingsAttendedPage