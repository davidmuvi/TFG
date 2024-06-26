import Order from '../models/order.js'

class OrderController {
    async createOrder(req, res) {
        const { bookingId, products } = req.body

        try {
            const newOrder = new Order({ bookingId, products })
            const orderSaved = await newOrder.save()
            res.status(201).json(orderSaved)
        } catch (error) {
            res.status(404).json({ message: 'Error creating order' })
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await Order.find().populate('bookingId')
            res.status(200).json(orders)
        } catch (error) {
            res.status(404).json({ message: 'Orders not found' })
        }
    }

    async getOrderByBookingId(req, res) {
        try {
            const order = await Order.findOne({ bookingId: req.params.bookingId }).populate('bookingId').populate('products')
            res.status(200).json(order)
        } catch (error) {
            res.status(404).json({ message: 'Order not found' })
        }
    }

    async updateOrderByBookingId(req, res) {
        try {
            const order = await Order.findOne({ bookingId: req.params.bookingId })
            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            }
            const { productId } = req.body
            order.products.push(productId)
            await order.save()
            res.status(200).json(order)
        } catch (error) {
            res.status(404).json({ message: 'Error updating order' })
        }
    }

    async deleteProductInOrderByBookingId(req, res) {
        try {
            const order = await Order.findOne({ bookingId: req.params.bookingId })
            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            }
            const { productId } = req.body

            // Encuentro el primer índice que coincide con el id del producto a eliminar.
            const productIndex = order.products.indexOf(productId)
            // Compruebo que haya un producto con ese id dentro de los productos.
            if (productIndex >= 0) {
                // Elimino el producto del array.
                order.products.splice(productIndex, 1)
            }
            await order.save()
            res.status(200).json(order)
        } catch (error) {
            res.status(404).json({ message: 'Error updating order' })
        }
    }

    async deleteOrderByBookingId(req, res) {
        try {
            const order = await Order.findOneAndDelete({ bookingId: req.params.bookingId })
            res.status(200).json(order)
        } catch (error) {
            res.status(404).json({ message: 'Order not found' })
        }
    }
}

export const orderController = new OrderController()