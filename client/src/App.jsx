import React, { useState } from 'react'
import Navbar from './components/Navbar'
import {Route , Routes , useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import MyBooking from './pages/MyBooking'
import Footer from './components/Footer'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()
  const isOwner = location.pathname.startsWith('/owner')

  return (
    <>
      {!isOwner && <Navbar setShowLogin={setShowLogin} />}
      {/* You can add your routes/components here */}

    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/car-details/:id' element={<CarDetails/>} /> */}
      <Route path='/cars' element={<Cars />} />
      <Route path='/my-bookings' element={<MyBooking />} />


      
      

    </Routes>
    {!isOwner && <Footer />}
    </>
  )
}

export default App
