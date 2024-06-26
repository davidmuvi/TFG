import { Router } from 'express'
import { stockController } from '../controllers/stock.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createStockSchema } from '../schemas/stock.js'

const router = Router()

router.get('/', stockController.getAllStocks)
router.post('/', validateSchema(createStockSchema), stockController.createStock)
router.get('/:id', stockController.getStockById)
router.get('/product/:productId', stockController.getStockByProductId)
router.patch('/product/:productId', stockController.updateStockByProductId)
router.patch('/product/increase/:productId', stockController.increaseStockByProductId)
router.patch('/product/decrease/:productId', stockController.decreaseStockByProductId)
router.delete('/:id', stockController.deleteStockById)
export default router
