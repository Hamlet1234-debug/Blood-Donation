import { Routes, Route, Navigate } from 'react-router-dom'
import Toast from './components/Toast'
import { ROUTES } from './routes'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/DonorDashboard'
import MyProfile from './pages/MyProfile'
import Settings from './pages/Settings'
import SearchDonor from './pages/SearchDonor'
import AdminDashboard from './pages/AdminDashboard'
import DonorManagement from './pages/DonorManagement'
import AddDonor from './pages/AddDonor'
import BloodStock from './pages/BloodStock'
import BloodGroups from './pages/BloodGroups'
import Emergency from './pages/Emergency'
import About from './pages/About'

export default function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path={ROUTES['home']} element={<Home />} />
        <Route path={ROUTES['login']} element={<Login />} />
        <Route path={ROUTES['register']} element={<Register />} />
        <Route path={ROUTES['donor-dash']} element={<DonorDashboard />} />
        <Route path={ROUTES['my-profile']} element={<MyProfile />} />
        <Route path={ROUTES['settings']} element={<Settings />} />
        <Route path={ROUTES['search']} element={<SearchDonor />} />
        <Route path={ROUTES['admin-dash']} element={<AdminDashboard />} />
        <Route path={ROUTES['donor-mgmt']} element={<DonorManagement />} />
        <Route path={ROUTES['add-donor']} element={<AddDonor />} />
        <Route path={ROUTES['stock']} element={<BloodStock />} />
        <Route path={ROUTES['donor-stock']} element={<BloodGroups />} />
        <Route path={ROUTES['emergency']} element={<Emergency />} />
        <Route path={ROUTES['about']} element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
