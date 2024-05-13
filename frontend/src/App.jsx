import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/employees' element={<EmployeePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App