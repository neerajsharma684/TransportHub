import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Home,
  About,
  Login,
  AdminLogin,
  Signup,
  ForgotPassword
} from './pages/index'
import Navbar from './components/Navbar'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    
  )
}

export default App
