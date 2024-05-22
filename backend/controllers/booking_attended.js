import BookingAttended from '../models/booking_attended.js'

class BookingAttendedController {
    async createBookingAttended(req, res) {
        const { employeeId, bookingId } = req.body
        try {
            const newBookingAttended = new BookingAttended({ employeeId, bookingId })
            const bookingAttendedSaved = await newBookingAttended.save()
            res.status(201).json(bookingAttendedSaved)
        } catch (error) {
            res.status(404).json({ message: 'Error creating booking attended' })
        }
    }

    async getBookingsAttended(req, res) {
        try {
            const bookingsAttended = await BookingAttended.find().populate('employeeId').populate('bookingId')
            res.status(200).json(bookingsAttended)
        } catch (error) {
            res.status(404).json({ message: 'Bookings attended not found' })
        }
    }
}

export const bookingAttendedController = new BookingAttendedController()