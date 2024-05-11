import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Booking', bookingSchema)
