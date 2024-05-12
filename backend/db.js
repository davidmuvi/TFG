import mongoose from 'mongoose'
import 'dotenv/config'
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err)
  }
}
