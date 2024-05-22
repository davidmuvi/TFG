import { Router } from 'express'
import { bookingController } from '../controllers/booking.js'
import { createBookingSchema } from '../schemas/booking.js'
import { validateSchema } from '../middlewares/schema_validator.js'

const router = Router()

router.get('/', bookingController.getAllBookings)
router.get('/:id', bookingController.getBookingById)
router.post('/', validateSchema(createBookingSchema), bookingController.createBooking)
router.patch('/:id', bookingController.updateBookingById)
router.delete('/:id', bookingController.deleteBookingById)
router.get('/tables/with-assignments', bookingController.getAllBookingsWithTable)

export default router
