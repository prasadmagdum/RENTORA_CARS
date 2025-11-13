import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-14 py-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden shadow-lg">

      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Do You Own a Luxury Car?
        </h2>
        <p className="mt-4 text-white/90 text-sm md:text-base">
          Monetize your vehicle effortlessly by listing it on Rentora.
        </p>
        <p className="mt-2 text-white/80 text-sm md:text-base max-w-md">
          We take care of insurance, maintenance, and bookings, ensuring a hassle-free experience.
        </p>
      </div>

      {/* Car Image */}
      <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
        <img 
          src={assets.Scorpio} 
          alt="Luxury Car" 
          className="w-full max-w-xs md:max-w-sm object-contain"
        />
      </div>

    </div>
  );
};

export default Banner;
