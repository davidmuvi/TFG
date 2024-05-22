import axios from 'axios'

class BookingAttendedService {
    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_DBURL}`,
            withCredentials: true
        })
        this.api.interceptors.request.use(config => {
            const storeToken = localStorage.getItem('ACCESS_TOKEN')
            if (storeToken) {
                config.headers.Authorization = `Bearer ${storeToken}`
            }

            return config
        })
    }

    async getBookingsAttended() {
        try {
            const response = await this.api.get('/api/bookings_attended')
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const bookingAttendedService = new BookingAttendedService()