import express from 'express'
import 'dotenv/config'
import employeeRoutes from './routes/employee.js'
import clientRoutes from './routes/client.js'
import providerRoutes from './routes/provider.js'
import bookingRoutes from './routes/booking.js'
import tableRoutes from './routes/table.js'

const app = express()
app.use(express.json())
app.use('/employees', employeeRoutes)
app.use('/clients', clientRoutes)
app.use('/providers', providerRoutes)
app.use('/bookings', bookingRoutes)
app.use('/tables', tableRoutes)
export default app
