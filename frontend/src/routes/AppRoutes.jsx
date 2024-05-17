import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import EmployeePage from '../pages/EmployeePage'
import ProtectedRoute from '../ProtectedRoute'
import BookingsPage from '../pages/BookingsPage'
import ProductsPage from '../pages/ProductsPage'
import ProvidersPage from '../pages/ProvidersPage'
import TablesPage from '../pages/TablesPage'
import AddBookingPage from '../pages/AddBookingPage'

const appRoutes = () => {
return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
            <Route path='/employees' element={<EmployeePage />} />
            <Route path='/bookings/add' element={<AddBookingPage />} />
            <Route path='/bookings' element={<BookingsPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/providers' element={<ProvidersPage />} />
            <Route path='/tables' element={<TablesPage />} />
        </Route>
    </Routes>
)
}

export default appRoutes