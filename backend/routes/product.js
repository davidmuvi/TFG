import { Router } from 'express'
import { createProduct, getProducts, getProductById, updateProduct } from '../controllers/product.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createProductSchema } from '../schemas/product.js'

const router = Router()

router.get('/', getProducts)
router.post('/', validateSchema(createProductSchema), createProduct)
router.get('/:id', getProductById)
router.patch('/:id', updateProduct)

export default router
