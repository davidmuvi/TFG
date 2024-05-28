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
            const response = await this.api.get('/api/products')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createProduct(product) {
        try {
            const response = await this.api.post('/api/products', product)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProduct(id) {
        try {
            const response = await this.api.delete(`/api/products/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProduct(id, product) {
        try {
            const response = await this.api.patch(`/api/products/${id}`, product)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductByName(name) {
        try {
            const response = await this.api.get(`/api/products/name/${name}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductById(id) {
        try {
            const response = await this.api.get(`/api/products/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const productService = new ProductService()