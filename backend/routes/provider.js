import { Router } from 'express'
import { providerController } from '../controllers/provider.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createProviderSchema } from '../schemas/provider.js'

const router = Router()

router.get('/', providerController.getAllProviders)
router.post('/', validateSchema(createProviderSchema), providerController.createProvider)
router.get('/:id', providerController.getProviderById)
router.get('/name/:name', providerController.getProviderByName)
router.patch('/:id', providerController.updateProvider)
router.delete('/:id', providerController.deleteProviderById)
export default router
