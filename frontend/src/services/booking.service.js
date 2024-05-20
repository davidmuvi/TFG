import axios from 'axios'

class BookingService {
    constructor(){
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
    }
    async getBookings(){
        try {
            const response = await this.api.get('/bookings')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteBooking(id){
        try {
            const response = await this.api.delete(`/bookings/${id}`)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createBooking(booking){ 
        try {
            const response = await this.api.post('/bookings', booking)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateBooking(id, data) {
        try {
            const response = await this.api.patch(`/bookings/${id}`, data)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const bookingService = new BookingService()