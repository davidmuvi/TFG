import axios from 'axios'

class TableService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async createTable(table) {
        try {
            const response = await this.api.post('/api/tables', table)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getTables() {
        try {
            const response = await this.api.get('/api/tables')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteTable(id) {
        try {
            const response = await this.api.delete(`/api/tables/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getTablesWithoutAvailability() {
        try {
            const response = await this.api.get('/api/bookings/tables/with-assignments')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    async updateTable(id, table) {
        try {
            const response = await this.api.patch(`/api/tables/${id}`, table)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getTableByTableNumber(tableNumber) {
        try {
            const response = await this.api.get(`/api/tables/tableNumber/${tableNumber}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const tableService = new TableService()