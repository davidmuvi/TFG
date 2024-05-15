import { useEffect, useState } from 'react'
import { bookingService } from '../services/booking.service.js'
import Layout from '../layouts/LayoutPages'
import { Card, Typography } from "@material-tailwind/react"
import { XCircleIcon } from '@heroicons/react/24/solid'

function BookingsPage() {
    const [bookings, setBookings] = useState([])

    const TABLE_HEAD = ["Cliente", "Teléfono", "Fecha", ""]
    const TABLE_ROWS = bookings

    useEffect(() => {
        getBookings()
    }, [])

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
        bookingService.deleteTable(bookingId)
        .then(() => {
            getBookings()
        })
        .catch(error => {console.log(error)})
    }

    const formatDate = (date) => { 
        const newDate = new Date(date.date)
        return newDate.toLocaleDateString()
    }

    return (
        <Layout>
        <Card className="h-5/6 max-h-full">
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
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                    return (
                    <tr key={_id}>
                        <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {clientId.name}
                        </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {clientId.telephone}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            {formatDate({date})}
                        </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50 h-full flex items-center justify-center`}>
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium w-6 h-6" onClick={() => deleteBooking(_id)}>
                            <XCircleIcon className='w-6 h-6 text-red-500'/>
                        </Typography>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </Card>
    </Layout>
    )
}

export default BookingsPage