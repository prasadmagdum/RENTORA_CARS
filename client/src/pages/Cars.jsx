import React, { useState } from "react";
import { dummyCarData, assets, cityList } from "../assets/assets";
import { Link } from "react-router-dom";

const Cars = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");

  // Filter cars by search and city
  const filteredCars = dummyCarData.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city === "All" || car.location === city;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16 mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Cars</h1>

      {/* Search + Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="All">All Cities</option>
          {cityList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Cars List */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {car.category} • {car.year}
                </p>
                <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <img src={assets.users_icon} alt="" className="w-4 h-4" />
                    {car.seating_capacity} Seats
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.fuel_icon} alt="" className="w-4 h-4" />
                    {car.fuel_type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">
                    ${car.pricePerDay} / day
                  </p>
                  <Link to={`/car-details/${car._id}`}>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No cars found matching your search.
        </p>
      )}
    </div>
  );
};

export default Cars;
