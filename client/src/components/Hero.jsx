import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log({
      pickupLocation,
      pickupDate,
      returnDate
    })
    // Later you can navigate or call API here
  }

  return (
    <div>
      <div className='h-screen flex flex-col items-center gap-14 bg-light text-center px-6'>
        <h1 className='text-4xl md:text-5xl font-semibold mt-10'>
          Find the perfect car for your next adventure
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className='flex flex-col md:flex-row items-start md:items-center justify-between 
                     p-6 rounded-lg md:rounded-full w-full max-w-5xl bg-white 
                     shadow-[0px_8px_20px_rgba(0,0,0,0.1)] gap-6'
        >
          {/* Pickup Location */}
          <div className='flex flex-col text-left w-full md:w-auto'>
            <label className='text-sm font-medium text-gray-600 mb-1'>
              Pickup Location
            </label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none'
            >
              <option value="">Select Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className='flex flex-col text-left w-full md:w-auto'>
            <label className='text-sm font-medium text-gray-600 mb-1'>
              Pickup Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none'
            />
          </div>

          {/* Return Date */}
          <div className='flex flex-col text-left w-full md:w-auto'>
            <label className='text-sm font-medium text-gray-600 mb-1'>
              Return Date
            </label>
            <input
              type="date"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 outline-none'
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className='px-6 py-3 bg-primary hover:bg-primary-dull transition-all 
                       text-white rounded-lg w-full md:w-auto'
          >
            Search
          </button>
        </form>

        {/* Hero Image */}
        <img src={assets.main_car} alt="car" className='max-h-80' />
      </div>
    </div>
  )
}

export default Hero
