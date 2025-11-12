import React, { useState, useEffect } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()
  const [pickupLocation, setPickupLocation] = useState("")

  // Online car images for slideshow
  const carImages = [
    "https://inkasarmored.com/wp-content/uploads/INKAS-Land-Rover-2023-Defender-1.jpg",
    "https://images.hindustantimes.com/auto/img/2022/12/28/1600x900/Mahindra_Scorpio-N_1672200636159_1672200636299_1672200636299.jpg",
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [carImages.length])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(
      '/cars?pickupLocation=' + pickupLocation +
      '&pickupDate=' + pickupDate +
      '&returnDate=' + returnDate
    )
  }

  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {carImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="car background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-5xl text-white">
        <h1 className="text-4xl md:text-5xl font-semibold drop-shadow-lg">
          Find the perfect car for your next adventure
        </h1>

        {/* ✅ Single Search Form (Clean + Attractive) */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-center gap-4 
                    bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5 w-full max-w-3xl mx-auto"
        >
          {/* Pickup Location */}
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">Select Location</option>
            {cityList.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Pickup Date */}
          <input
            type="date"
            required
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* Return Date */}
          <input
            type="date"
            required
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary outline-none"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-md transition-all"
          >
            Search
          </button>
        </form>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {carImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current ? 'bg-white' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
