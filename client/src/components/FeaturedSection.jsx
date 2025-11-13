import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
  const { cars } = useAppContext();
  const navigate = useNavigate();

  if (!cars || cars.length === 0) return null; // Safe check

  return (
    <div className="flex flex-col items-center py-40 px-6 sm:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <Title
        title="Featured Vehicles"
        subtitle="Explore our selection of premium vehicles available for your next adventure"
      />

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
        {cars.slice(0, 8).map((car) => (
          <CarCard key={car._id || car.id} car={car} />
        ))}
      </div>

      {/* Explore All Cars Button */}
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg mt-12 font-medium transition-all"
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FeaturedSection;
