import axios from 'axios'

const API = 'http://localhost:3000'
export const getTables = async () => {
    const response = await axios.get(`${API}/tables`)
    return response.data
}