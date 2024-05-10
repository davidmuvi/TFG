import { connectDB } from './db.js'
import app from './app.js'
connectDB()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`)
})
