import axios from 'axios'

class ClientService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async createClient(client) {
        try {
            const response = await this.api.post('/api/clients', client)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getClientByTelephone(telephone) {
        try {
            const response = await this.api.get(`/api/clients/${telephone}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getClientById(id) {
        try {
            const response = await this.api.get(`/api/clients/id/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const clientService = new ClientService()