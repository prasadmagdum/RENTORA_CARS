import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row md:items-start items-center  justify-between  px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>

        <div>
            <h2 className='text-3xl font-medium'> Do You Own a Luxury Car</h2>
            <p className='mt-2'>
                Monetize your vehicle effortlessly by listing it on Rentora.
            </p>

            <p className='max-w-130'>
                We take  care of insurance, maintenance, and bookings, ensuring a hassle-free experience.
            </p>

            <button className='bg-black text-white px-6 py-2 rounded-md mt-6 hover:bg-gray-800 transition-colors duration-300'>
                List Your Car
            </button>

        </div>

        <img src={assets.banner_car_image} alt="car" className='max-h-45 mt-10'/>


    </div>
  )
}

export default Banner