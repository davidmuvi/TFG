import express from 'express'
import cors from 'cors'
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

const app = express()
app.use(cors())
app.use(express.json())
app.use('/employees', employeeRoutes)
app.use('/clients', clientRoutes)
app.use('/providers', providerRoutes)
app.use('/bookings', bookingRoutes)
app.use('/tables', tableRoutes)
app.use('/products', productRoutes)
app.use('/stocks', stockRoutes)
app.use('/admins', adminRoutes)
app.use('/login', loginRoutes)
export default app
