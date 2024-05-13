import { Router } from 'express'
import { createAdmin } from '../controllers/admin.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createAdminSchema } from '../schemas/admin.js'

const router = Router()

router.post('/', validateSchema(createAdminSchema), createAdmin)

export default router
