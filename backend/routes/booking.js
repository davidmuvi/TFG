import { Router } from 'express'
import { createBooking, getAllBookings, getBookingById, updateBookingById } from '../controllers/booking.js'
import { createBookingSchema } from '../schemas/booking.js'
import { validateSchema } from '../middlewares/schema_validator.js'

const router = Router()

router.get('/', getAllBookings)
router.get('/:id', getBookingById)
router.post('/', validateSchema(createBookingSchema), createBooking)
router.patch('/:id', updateBookingById)

export default router
