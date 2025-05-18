import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  { Navbar } from "./components/Navbar"
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserLogin } from './components/user/UserLogin'
import { UserRegistration } from './components/user/UserRegistration'
import LandingPage from './components/common/LandingPage'
import UserDashboard from './components/user/UserDashboard'
import UserLayout from './components/user/UserLayout'
import UserSettings from './components/user/UserSettings'
import UserDocuments from './components/user/UserDocuments'
//import './App.css'

function App() {

  const location = useLocation();

  // Paths where Navbar should be shown
  const showNavbarPaths = ["/", "/login", "/register"];

  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);


  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/login' element={<UserLogin />}></Route>
          <Route path='/register' element={<UserRegistration />}></Route>
          <Route path="/" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="documents" element={<UserDocuments />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App
