import { connectDB } from './db.js'
import app from './app.js'
import { checkBookingsAndSendEmail } from './controllers/email.js'
import cron from 'node-cron'

connectDB()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)

  // Programo la tarea para que revise las reservas y envíe el email todos los días a las 09:00
  cron.schedule('0 9 * * *', () => {
    checkBookingsAndSendEmail()
  })

})
