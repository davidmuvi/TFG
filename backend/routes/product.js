import { Router } from 'express'
import { productController } from '../controllers/product.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createProductSchema } from '../schemas/product.js'

const router = Router()

router.get('/', productController.getProducts)
router.post('/', validateSchema(createProductSchema), productController.createProduct)
router.get('/:id', productController.getProductById)
router.get('/name/:name', productController.getProductByName)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProductById)

export default router
