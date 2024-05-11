import { Router } from 'express'
import { createProvider, getAllProviders, getProviderById, updateProvider } from '../controllers/provider.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createProviderSchema } from '../schemas/provider.js'

const router = Router()

router.get('/', getAllProviders)
router.post('/', validateSchema(createProviderSchema), createProvider)
router.get('/:id', getProviderById)
router.patch('/:id', updateProvider)

export default router
