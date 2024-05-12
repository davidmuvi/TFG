import { Router } from 'express'
import { createStock, getAllStocks, getStockById, updateStockById } from '../controllers/stock.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createStockSchema } from '../schemas/stock.js'

const router = Router()

router.get('/', getAllStocks)
router.post('/', validateSchema(createStockSchema), createStock)
router.get('/:id', getStockById)
router.patch('/:id', updateStockById)

export default router
