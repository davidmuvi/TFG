import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ProtectedRoute from '../ProtectedRoute'
import BookingsPage from '../pages/BookingsPage'
import ProductsPage from '../pages/ProductsPage'
import ProvidersPage from '../pages/ProvidersPage'
import TablesPage from '../pages/TablesPage'
import AddBookingPage from '../pages/AddBookingPage'
import AddProductPage from '../pages/AddProductPage'
import AddProviderPage from '../pages/AddProviderPage'
import AddTablePage from '../pages/AddTablePage'
import BookingsAttendedPage from '../pages/BookingsAttendedPage'
import { AdminPage } from '../pages/AdminPage'

const appRoutes = ({bookings, setBookings}) => {
    
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/bookings' element={<BookingsPage bookings={bookings} setBookings={setBookings}/>} />
                <Route path='/bookings/add' element={<AddBookingPage />} />
                <Route path='/bookings_attended' element={<BookingsAttendedPage />}/>
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/add' element={<AddProductPage />} />
                <Route path='/providers' element={<ProvidersPage />} />
                <Route path='/providers/add' element={<AddProviderPage />} />
                <Route path='/tables' element={<TablesPage bookings={bookings}/>} />
                <Route path='/tables/add' element={<AddTablePage />} />
                <Route path='/admin' element={<AdminPage />} />
            </Route>
        </Routes>
    )
}

export default appRoutes