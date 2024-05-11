import { Router } from 'express'
import { createEmployee } from '../controllers/employee.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createEmployeeSchema } from '../schemas/employee.js'

const router = Router()

router.post('/', validateSchema(createEmployeeSchema), createEmployee)

export default router
