import mongoose from 'mongoose'

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
})

export default mongoose.model('Provider', providerSchema)
