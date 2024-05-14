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
import { verifyToken } from './controllers/login.js'
import isAuthenticated from './middlewares/verifyToken.js'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/employees', employeeRoutes)
app.use('/clients', clientRoutes)
app.use('/providers', providerRoutes)
app.use('/bookings', bookingRoutes)
app.use('/tables', tableRoutes)
app.use('/products', productRoutes)
app.use('/stocks', stockRoutes)
app.use('/admins', adminRoutes)
app.use('/login', loginRoutes)
app.get('/verifyToken', isAuthenticated, verifyToken)
export default app
