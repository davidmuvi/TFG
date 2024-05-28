import axios from 'axios'

class StockService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async createStock(stock) {
        try {
            const response = await this.api.post('/api/stock', stock)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getStockByProductId(productId) {
        try {
            const response = await this.api.get(`/api/stock/product/${productId}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
export const stockService = new StockService()