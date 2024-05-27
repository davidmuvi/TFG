import axios from 'axios'

class OrderService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async getOrders() {
        try {
            const response = await this.api.get('/api/orders')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createOrder(order) {
        try {
            const response = await this.api.post('/api/orders', order)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOrderByBookingId(id) {
        try {
            const response = await this.api.get(`/api/orders/booking/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateOrderByBookingId(id, order) {
        try {
            const response = await this.api.patch(`/api/orders/${id}`, { productId: order })
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteOrderByBookingId(id) {
        try {
            const response = await this.api.delete(`/api/orders/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const orderService = new OrderService()