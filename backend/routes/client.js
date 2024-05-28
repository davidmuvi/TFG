import { Router } from 'express'
import { clientController } from '../controllers/client.js'
import { validateSchema } from '../middlewares/schema_validator.js'
import { createClientSchema } from '../schemas/client.js'

const router = Router()

router.get('/', clientController.getAllClients)
router.post('/', validateSchema(createClientSchema), clientController.createClient)
router.get('/:telephone', clientController.getClientByTelephone)
router.get('/id/:id', clientController.getClientById)
router.patch('/:id', clientController.updateClientById)
router.delete('/:id', clientController.deleteClientById)

export default router
