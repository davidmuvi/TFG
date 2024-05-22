import { Router } from 'express'
import { adminController } from '../controllers/admin.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createAdminSchema } from '../schemas/admin.js'

const router = Router()

router.post('/', validateSchema(createAdminSchema), adminController.createAdmin)

export default router
