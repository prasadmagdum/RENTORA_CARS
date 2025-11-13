import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // Fetch car by ID
  useEffect(() => {
    const foundCar = cars.find((c) => c._id === id);
    setCar(foundCar);
  }, [cars, id]);

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    try {
      const { data } = await axios.post("/api/bookings/create-booking", {
        carId: car._id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings"); // redirect to bookings page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16 mb-20">
      {/* Back Button */}
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo(0, 0);
        }}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-black transition-all"
      >
        <img
          src={assets.arrow_icon}
          alt="Back"
          className="rotate-180 opacity-70 w-4"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left — Car Image & Info */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full rounded-2xl object-cover max-h-[460px] shadow-md"
          />

          <div className="mt-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-xl"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  <p className="text-gray-700 text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-medium mb-2">Description</h2>
              <p className="text-gray-500 leading-relaxed">{car.description}</p>
            </div>
          </div>
        </div>

        {/* Right — Booking Box */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col justify-between h-fit">
          <div>
            <h2 className="text-2xl font-semibold"> ₹{car.pricePerDay}</h2>
            <p className="text-gray-400 text-sm mb-6">per day</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pickup Date
                </label>
                <input
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Return Date
                </label>
                <input
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  type="date"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Book Now
          </button>

          <p className="text-center text-gray-400 text-xs mt-3">
            No credit card required to reserve
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
