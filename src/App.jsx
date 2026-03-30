import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import GroupDetail from './pages/GroupDetail'
import Settle from './pages/Settle'
import AddExpense from './pages/AddExpense'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/group/:id" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>} />
        <Route path="/settle" element={<ProtectedRoute><Settle /></ProtectedRoute>} />
        <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
