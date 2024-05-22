import axios from 'axios'

class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }
    async getProducts() {
        try {
            const response = await this.api.get('/products')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createProduct(product) {
        try {
            const response = await this.api.post('/products', product)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProduct(id) {
        try {
            const response = await this.api.delete(`/products/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProduct(id, product) {
        try {
            const response = await this.api.patch(`/products/${id}`, product)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const productService = new ProductService()