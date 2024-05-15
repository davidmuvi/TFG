import axios from 'axios'

class ProviderService {
    constructor(){
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }
    async getProviders(){
        try {
            const response = await this.api.get('/providers')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProvider(id){
        try {
            const response = await this.api.delete(`/providers/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsByProvider(id){ 
        try {
            let totalNumberOfProducts = 0
            const products = await this.api.get('/products')
            products.map(product => {
                if(product.providerId === id){
                    totalNumberOfProducts++
                }
            })
            return totalNumberOfProducts
        } catch (error) {
            console.log(error)
        }
    }
}

export const providerService = new ProviderService()