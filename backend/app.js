import express from 'express'
import 'dotenv/config'
import employeeRoutes from './routes/employee.js'
import clientRoutes from './routes/client.js'

const app = express()
app.use(express.json())
app.use('/employees', employeeRoutes)
app.use('/clients', clientRoutes)
export default app
