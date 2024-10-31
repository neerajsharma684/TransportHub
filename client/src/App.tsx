import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Home,
  About,
  Login,
  Signup,
  ForgotPassword
} from './pages/index'
import './App.css'

function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    
  )
}

export default App
