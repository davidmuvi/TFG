import axios from 'axios'

class AuthService {
    constructor(){
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
    login(data){
        return this.api.post('/login', data)
    }

    verifyToken(accessToken){
        return this.api.get('/verifyToken', {headers: {Authorization: `Bearer ${accessToken}`}})
    }
}

export const authService = new AuthService()