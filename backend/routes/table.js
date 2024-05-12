import { Router } from 'express'
import { createTable, getAllTables, getTableById, updateTableById } from '../controllers/table.js'
import { createTableSchema } from '../schemas/table.js'
import { validateSchema } from '../middlewares/schema_validator.js'

const router = Router()

router.get('/', getAllTables)
router.get('/:id', getTableById)
router.post('/', validateSchema(createTableSchema), createTable)
router.put('/:id', validateSchema(createTableSchema), updateTableById)

export default router
