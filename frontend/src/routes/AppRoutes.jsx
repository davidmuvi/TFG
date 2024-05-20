import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import EmployeePage from '../pages/EmployeePage'
import ProtectedRoute from '../ProtectedRoute'
import BookingsPage from '../pages/BookingsPage'
import ProductsPage from '../pages/ProductsPage'
import ProvidersPage from '../pages/ProvidersPage'
import TablesPage from '../pages/TablesPage'
import AddBookingPage from '../pages/AddBookingPage'
import AddProductPage from '../pages/AddProductPage'
import AddProviderPage from '../pages/AddProviderPage'
import AddTablePage from '../pages/AddTablePage'

const appRoutes = () => {
return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
            <Route path='/employees' element={<EmployeePage />} />
            <Route path='/bookings' element={<BookingsPage />} />
            <Route path='/bookings/add' element={<AddBookingPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/add' element={<AddProductPage />} />
            <Route path='/providers' element={<ProvidersPage />} />
            <Route path='/providers/add' element={<AddProviderPage />} />
            <Route path='/tables' element={<TablesPage />} />
            <Route path='/tables/add' element={<AddTablePage />} />
        </Route>
    </Routes>
)
}

export default appRoutes