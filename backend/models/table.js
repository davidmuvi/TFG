import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Table', tableSchema)
