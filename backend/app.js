import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import employeeRoutes from './routes/employee.js'
import clientRoutes from './routes/client.js'
import providerRoutes from './routes/provider.js'
import bookingRoutes from './routes/booking.js'
import tableRoutes from './routes/table.js'
import productRoutes from './routes/product.js'
import stockRoutes from './routes/stock.js'
import adminRoutes from './routes/admin.js'
import loginRoutes from './routes/login.js'
import orderRoutes from './routes/order.js'
import bookingAttendedRoutes from './routes/booking_attended.js'
import { loginController } from './controllers/login.js'
import isAuthenticated from './middlewares/verifyToken.js'

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/employees', employeeRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/providers', providerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/bookings_attended', bookingAttendedRoutes)
app.use('/api/tables', tableRoutes)
app.use('/api/products', productRoutes)
app.use('/api/stock', stockRoutes)
app.use('/api/admins', adminRoutes)
app.use('/api/login', loginRoutes)
app.get('/api/verifyToken', isAuthenticated, loginController.verifyToken)
export default app
