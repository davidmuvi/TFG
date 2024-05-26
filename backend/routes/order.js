import { Router } from 'express'
import { orderController } from '../controllers/order.js'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/', orderController.getOrders)
router.get('/booking/:bookingId', orderController.getOrderByBookingId)
router.patch('/:bookingId', orderController.updateOrderByBookingId)
router.delete('/:bookingId', orderController.deleteOrderByBookingId)
export default router