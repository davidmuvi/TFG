import { Router } from 'express'
import { createClient, deleteClientById, getAllClients, getClientByTelephone, updateClientById } from '../controllers/client.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createClientSchema } from '../schemas/client.js'

const router = Router()

router.get('/', getAllClients)
router.post('/', validateSchema(createClientSchema), createClient)
router.get('/:telephone', getClientByTelephone)
router.patch('/:id', updateClientById)
router.delete('/:id', deleteClientById)

export default router
