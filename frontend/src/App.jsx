import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { UserLogin } from './components/user/UserLogin'
import { UserRegistration } from './components/user/UserRegistration'
import LandingPage from './components/common/LandingPage'
import UserDashboard from './components/user/UserDashboard'
//import './App.css'

function App() {

  return (
    <>
      <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<UserLogin/>}></Route>
        <Route path='/register' element={<UserRegistration/>}></Route>
        <Route path='/dashboard' element={<UserDashboard/>}></Route>
      </Routes>
      </div>
    </>
  )
}

export default App
