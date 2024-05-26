import axios from 'axios'

class EmployeeService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }

    async getEmployees() {
        try {
            const response = await this.api.get('/api/employees')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createEmployee(employee) {
        try {
            const response = await this.api.post('/api/employees', employee)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateEmployee(id, employee) {
        try {
            const response = await this.api.patch(`/api/employees/${id}`, employee)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteEmployee(id) {
        try {
            const response = await this.api.delete(`/api/employees/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const employeeService = new EmployeeService()