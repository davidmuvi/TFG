import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://davidmunozvillalba:QF8ekq7BRxMyfawV@cluster0.xdeitbj.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0')
    console.log('MongoDB Connected')
  } catch (err) {
    console.error(err)
  }
}
