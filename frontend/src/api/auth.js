import axios from 'axios'

const API = 'http://localhost:3000'

export const loginRequest = user => axios.post(`${API}/login`, user)