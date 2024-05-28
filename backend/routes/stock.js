import { Router } from 'express'
import { stockController } from '../controllers/stock.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createStockSchema } from '../schemas/stock.js'

const router = Router()

router.get('/', stockController.getAllStocks)
router.post('/', validateSchema(createStockSchema), stockController.createStock)
router.get('/:id', stockController.getStockById)
router.patch('/:id', stockController.updateStockById)

export default router
