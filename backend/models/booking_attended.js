import mongoose from 'mongoose'

const bookingAttendedSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
})

export default mongoose.model('BookingAttended', bookingAttendedSchema)
