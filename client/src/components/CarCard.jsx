import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        window.scrollTo(0, 0);
      }}
      className="group relative rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer bg-white"
    >
      {/* Car Image */}
      <div className="relative">
        <img
          src={car.image || assets.default_car}
          alt={car.name || 'Car Image'}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability Badge */}
        {car.isAvailable && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            Available
          </span>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-baseline gap-1 shadow">
          <span className="font-bold text-sm">{currency}{car.pricePerDay}</span>
          <span className="text-xs text-white/80">/ day</span>
        </div>
      </div>

      {/* Car Info */}
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {car.category} • {car.year}
        </p>

        {/* Car Specs */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="Seats" className="h-4 w-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="Fuel" className="h-4 w-4" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="Transmission" className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="Location" className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarCard;
