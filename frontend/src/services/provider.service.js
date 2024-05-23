import axios from 'axios'

class ProviderService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async createProvider(provider) {
        try {
            const response = await this.api.post('/api/providers', provider)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProviders() {
        try {
            const response = await this.api.get('/api/providers')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProviderByName(providerName) {
        try {
            const response = await this.api.get(`/api/providers/name/${providerName}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProvider(id) {
        try {
            const response = await this.api.delete(`/api/providers/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductsByProvider(id) {
        try {
            let totalNumberOfProducts = 0
            const products = await this.api.get('/api/products')
            products.data.map(product => {
                if (product.providerId._id === id) {
                    totalNumberOfProducts++
                }
            })
            return totalNumberOfProducts
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProvider(id, provider) {
        try {
            const response = await this.api.patch(`/api/providers/${id}`, provider)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const providerService = new ProviderService()