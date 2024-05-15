import axios from 'axios'

class TableService {
    constructor(){
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }
    async getTables(){
        try {
            const response = await this.api.get('/tables')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTable(id){
        try {
            const response = await this.api.delete(`/tables/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async getTablesWithoutAvailability(){
        try {
            const response = await this.api.get('/bookings/tables/with-assignments')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export const tableService = new TableService()