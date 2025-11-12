import React, { useEffect, useState } from "react";
import { dummyCarData, assets, cityList } from "../assets/assets";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  // ✅ Filter cars locally
  const applyFilter = () => {
    if (!cars?.length) return;
    const filtered = cars.filter((car) =>
      [car.brand, car.model, car.category, car.transmission].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredCars(filtered);
  };

  // ✅ Search availability (API)
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0)
          toast("No cars available for selected dates");
      }
    } catch (err) {
      toast.error("Error checking availability");
    }
  };

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, [cars]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) applyFilter();
  }, [search, cars]);

  // ✅ Fallback data
  const visibleCars =
    filteredCars.length > 0
      ? filteredCars
      : dummyCarData.filter((car) => {
          const matchesSearch =
            car.brand.toLowerCase().includes(search.toLowerCase()) ||
            car.model.toLowerCase().includes(search.toLowerCase());
          const matchesCity = city === "All" || car.location === city;
          return matchesSearch && matchesCity;
        });

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16 mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Cars</h1>

      {/* 🔍 Search + City Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by brand, model, or type..."
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

      {/* 🚗 Cars Grid */}
      {visibleCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCars.map((car) => (
            <div
              key={car._id || car.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={car.image || assets.default_car}
                onError={(e) => (e.target.src = assets.default_car)}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">
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
                  <Link to={`/car-details/${car._id || car.id}`}>
                    <button
                      onClick={() => window.scrollTo(0, 0)}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all"
                    >
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
