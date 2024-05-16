import { Router } from 'express'
import { createEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployeeById } from '../controllers/employee.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createEmployeeSchema } from '../schemas/employee.js'

const router = Router()

router.get('/', getAllEmployees)
router.post('/', validateSchema(createEmployeeSchema), createEmployee)
router.get('/:id', getEmployeeById)
router.patch('/:id', updateEmployeeById)
router.delete('/:id', deleteEmployeeById)

export default router
