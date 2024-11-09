import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  Dashboard,
  About,
  Login,
  AdminLogin,
  AdminSignup,
  Signup,
  ForgotPassword,
  ManageUsers,
  ManageAdmins,
  Branch,
  AddBranch,
  NotFound
} from './pages/index'
import { Navbar, PrivateRoute } from './components/index'
import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { checkAuth } from './redux/authSlice'


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.email);
  const role = useSelector((state: RootState) => state.auth.role);

  console.log('App isLoggedIn:', isLoggedIn);
  console.log('App email:', email);
  console.log('App role:', role);

  return (

    <Router>
      <div className="flex">
        {isLoggedIn && <Navbar />}
        <div className="flex-grow ml-64 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<PrivateRoute requiredRoles={['admin', 'superadmin']} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-admins" element={<ManageAdmins />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/add-branch" element={<AddBranch />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
}

export default App
