import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import EmployeePage from '../pages/EmployeePage'
import ProtectedRoute from '../ProtectedRoute'


const appRoutes = () => {
return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
            <Route path='/employees' element={<EmployeePage />} />
        </Route>
    </Routes>
)
}

export default appRoutes