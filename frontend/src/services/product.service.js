import axios from 'axios'

class ProductService {
    constructor(){
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }
    async getProducts(){
        try {
            const response = await this.api.get('/products')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const response = await this.api.delete(`/products/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const productService = new ProductService()