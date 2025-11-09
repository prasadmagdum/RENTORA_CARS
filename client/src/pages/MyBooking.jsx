// src/pages/MyBooking.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {

  const {axios , user , currency}= useAppContext()



  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchMyBooking = async ()=>{
    try{
      const {data}= await axios.get('/api/bookings/user')
      if (data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }

    }catch{
      toast.error(error.message)

    }
  }

  // Simulate fetching bookings (you can replace this with API call later)
  useEffect(() => {
    user && fetchMyBooking()
  }, [user]);

  return (
    <div className="min-h-screen py-20 px-6 sm:px-16 lg:px-24 xl:px-32 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        My Bookings
      </h1>

      {/* If no bookings */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src={assets.empty_icon}
            alt="No Bookings"
            className="w-60 mb-6"
          />
          <p className="text-lg text-gray-600 mb-4">
            You don’t have any bookings yet.
          </p>
          <button
            onClick={() => navigate("/cars")}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        </div>
      ) : (
        // Booking List
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{booking.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {booking.type} • {booking.transmission}
                </p>
                <p className="text-gray-800 font-medium mb-1">
                  ₹{booking.price}/day
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Booked on: {booking.bookingDate}
                </p>

                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </span>

                <button
                  onClick={() =>
                    navigate(`/car-details/${booking.id}`, {
                      state: { fromBooking: true },
                    })
                  }
                  className="w-full mt-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
