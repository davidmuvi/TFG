import Booking from '../models/booking.js'

export const createBooking = async (req, res) => {
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

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.status(200).json(bookings)
  } catch (error) {
    res.status(404).json({ message: 'Bookings not found' })
  }
}

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    res.status(200).json(booking)
  } catch (error) {
    res.status(404).json({ message: 'Booking not found' })
  }
}

export const updateBookingById = async (req, res) => {
  try {
    const bookingFound = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(bookingFound)
  } catch (err) {
    res.status(404).json({ message: 'Booking not found' })
  }
}
