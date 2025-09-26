import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("")

  return (
    <div className='h-screen flex flex-col items-center gap-14 bg-light text-center px-4 md:px-12'>
      {/* Heading */}
      <h1 className='text-4xl md:text-5xl font-semibold mt-10'>
        Find the perfect car for your next adventure
      </h1>

      {/* Search Form */}
      <form className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-4xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:ml-8'>
          <div classname ='flex flex-col items-start gap-2'>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className='py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <p className='px-1 mt-2 text-sm text-gray-500'>
              {pickupLocation ? pickupLocation : 'Please Select Location'}
            </p>
          </div>
        </div>
      </form>

      {/* Car Image */}
      <img 
        src={assets.main_car} 
        alt="car" 
        className='max-h-80 w-auto mt-6'
      />
    </div>
  )
}

export default Hero
