import { Router } from 'express'
import { createProduct, getProducts, getProductById, getProductByName, updateProduct, deleteProductById } from '../controllers/product.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createProductSchema } from '../schemas/product.js'

const router = Router()

router.get('/', getProducts)
router.post('/', validateSchema(createProductSchema), createProduct)
router.get('/:id', getProductById)
router.get('/name/:name', getProductByName)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProductById)

export default router
