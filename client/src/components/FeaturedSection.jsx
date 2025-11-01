import React from "react";
import Title from "./Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate(); // ✅ Corrected

  return (
    <div className="flex flex-col items-center py-40 px-6 sm:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <div>
        <Title
          title="Featured Vehicles"
          subtitle="Explore our selection of premium vehicles available for your next adventure"
        />
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-18">
        {dummyCarData.slice(0, 6).map((car) => (
          <div
            key={car._id || car.id}
            onClick={() => {
              navigate(`/car-details/${car._id || car.id}`);
              window.scrollTo(0, 0);
            }}
            className="cursor-pointer"
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {/* Explore All Cars Button */}
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
