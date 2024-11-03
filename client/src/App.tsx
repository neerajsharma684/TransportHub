import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Dashboard,
  About,
  Login,
  AdminLogin,
  AdminSignup,
  Signup,
  ForgotPassword
} from './pages/index'
import Navbar from './components/Navbar'
import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { checkAuth } from './redux/authSlice'


function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.email);

  console.log('App isLoggedIn:', isLoggedIn);
  console.log('App email:', email);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    
      <Router>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    
  )
}

export default App
