import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        unique: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model('Order', orderSchema)