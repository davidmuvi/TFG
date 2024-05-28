import { Router } from 'express'
import { tableController } from '../controllers/table.js'
import { createTableSchema } from '../schemas/table.js'
import { validateSchema } from '../middlewares/schema_validator.js'

const router = Router()

router.get('/', tableController.getAllTables)
router.get('/:id', tableController.getTableById)
router.get('/tableNumber/:tableNumber', tableController.getTableByTableNumber)
router.post('/', validateSchema(createTableSchema), tableController.createTable)
router.patch('/:id', tableController.updateTableById)
router.delete('/:id', tableController.deleteTableById)

export default router
