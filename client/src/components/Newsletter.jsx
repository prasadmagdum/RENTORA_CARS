import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40'>

        <h1 className='md:text-4xl text-2xl font-semibold'> Never Miss a Deal!</h1>
        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe to our newsletter and be the first to know about exclusive offers, new arrivals, and exciting updates from Rentora. Join our community of car enthusiasts and stay ahead of the curve!</p>

        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input
                className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500'
                type="text"
                placeholder='Enter your email address'
                required
            />
            <button  type="submit" className=' md"px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-nonebg-black text-white px-6 py-3 rounded-md h-full hover:bg-gray-800 transition-colors duration-300 rounded-l-none'>
                Subscribe
            </button>
        </form>

    </div>
  )
}

export default Newsletter