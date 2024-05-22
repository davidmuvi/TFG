import Booking from '../models/booking.js'

class BookingController {
  async createBooking(req, res) {
    // Obtengo los datos de la reserva a guardar
    const { date, tableId, clientId } = req.body

    try {
      const newBooking = new Booking({ date, tableId, clientId })
      const bookingSaved = await newBooking.save()
      res.status(201).json(bookingSaved)
    } catch (err) {
      res.status(404).json({ message: 'Error creating booking' })
    }
  }

  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find().populate('clientId').populate('tableId')
      res.status(200).json(bookings)
    } catch (error) {
      res.status(404).json({ message: 'Bookings not found' })
    }
  }

  async getBookingById(req, res) {
    try {
      const booking = await Booking.findById(req.params.id)
      res.status(200).json(booking)
    } catch (error) {
      res.status(404).json({ message: 'Booking not found' })
    }
  }

  async updateBookingById(req, res) {
    try {
      const bookingFound = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(bookingFound)
    } catch (err) {
      res.status(404).json({ message: 'Booking not found' })
    }
  }

  async deleteBookingById(req, res) {
    try {
      const bookingDeleted = await Booking.findByIdAndDelete(req.params.id)
      res.status(200).json(bookingDeleted)
    } catch (err) {
      res.status(404).json({ message: 'Booking not found' })
    }
  }

  async getAllBookingsWithTable(req, res) {
    try {
      const bookings = await Booking.find({ tableId: { $exists: true, $ne: null } })
      res.status(200).json(bookings)
    } catch (error) {
      res.status(404).json({ message: 'No bookings with table assigned' })
    }
  }
}

export const bookingController = new BookingController()
