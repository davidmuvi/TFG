import { Router } from 'express'
import { createTable, getAllTables, getTableById, updateTableById, deleteTableById } from '../controllers/table.js'
import { createTableSchema } from '../schemas/table.js'
import { validateSchema } from '../middlewares/schema_validator.js'

const router = Router()

router.get('/', getAllTables)
router.get('/:id', getTableById)
router.post('/', validateSchema(createTableSchema), createTable)
router.patch('/:id', updateTableById)
router.delete('/:id', deleteTableById)

export default router
