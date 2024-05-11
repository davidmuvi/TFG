import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Client', clientSchema)
