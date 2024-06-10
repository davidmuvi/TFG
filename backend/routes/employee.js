import { Router } from 'express'
import { employeeController } from '../controllers/employee.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createEmployeeSchema, modifyEmployeeSchema } from '../schemas/employee.js'

const router = Router()

router.get('/', employeeController.getAllEmployees)
router.post('/', validateSchema(createEmployeeSchema), employeeController.createEmployee)
router.get('/:id', employeeController.getEmployeeById)
router.patch('/:id', validateSchema(modifyEmployeeSchema), employeeController.updateEmployeeById)
router.delete('/:id', employeeController.deleteEmployeeById)

export default router
