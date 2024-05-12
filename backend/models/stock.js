import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Stock', stockSchema)
