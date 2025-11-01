import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // ✅ Fix: Match both _id and id
  useEffect(() => {
    const foundCar = dummyCarData.find(
      (c) => String(c._id || c.id) === String(id)
    );
    setCar(foundCar);
  }, [id]);

  // ✅ If data found, render details
  return car ? (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16 mb-20">
      {/* ✅ Back Button — always go to /cars (fixes loading issue) */}
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-black transition-all"
      >
        <img
          src={assets.arrow_icon}
          alt=""
          className="rotate-180 opacity-65 w-4"
        />
        Back to all cars
      </button>

      {/* Car Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Car Image & Details */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-auto max-h-[450px] object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="space-y-6">
            {/* Title & Year */}
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-gray-300 my-6" />

            {/* Car Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>

            {/* Price and Book Button */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-semibold text-gray-800">
                ${car.pricePerDay} / day
              </p>
              <button
                onClick={() => navigate(`/book-car/${car._id || car.id}`)}
                className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500 text-lg mt-20">Loading...</p>
  );
};

export default CarDetails;
