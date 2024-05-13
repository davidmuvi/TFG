import axios from 'axios'

const API = 'http://localhost:3000'
export const getTables = async () => {
    const data = await axios.get(`${API}/tables`)
    console.log(data.data)
}

getTables()