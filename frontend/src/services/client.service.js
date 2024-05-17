import axios from 'axios'

class ClientService {
    constructor(){
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async getClientByTelephone(telephone){ 
        try {
            const response = await this.api.get(`/clients/${telephone}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const clientService = new ClientService()