import app from '../app.js'
import request from 'supertest'

describe('GET /api/bookings', () => {
    test('should response with a 200 status code', async () => {
        const response = await request(app).get('/api/bookings').send()
        console.log(response)
    })
})