import { Router } from 'express'
import { bookingAttendedController } from '../controllers/booking_attended.js'

const router = Router()

router.post('/', bookingAttendedController.createBookingAttended)
router.get('/', bookingAttendedController.getBookingsAttended)
export default router