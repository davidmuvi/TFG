import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [bookings, setBookings] = useState([])
  
  return (
    <AppRoutes bookings={bookings} setBookings={setBookings}/>
  )
}

export default App