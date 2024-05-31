import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { timestamps: true })

export default mongoose.model('Client', clientSchema)
