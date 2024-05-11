import { Router } from 'express'
import { createClient, getAllClients, getClientById, updateClientById } from '../controllers/client.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createClientSchema } from '../schemas/client.js'

const router = Router()

router.get('/', getAllClients)
router.post('/', validateSchema(createClientSchema), createClient)
router.get('/:id', getClientById)
router.patch('/:id', updateClientById)

export default router
