import express from 'express'
import 'dotenv/config'
import employeeRoutes from './routes/employee.js'

const app = express()
app.use(express.json())
app.use('/employees', employeeRoutes)
export default app
