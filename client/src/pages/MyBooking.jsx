import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const { axios, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch user bookings from API
  const fetchMyBooking = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user-bookings");
      if (data.success) {
        setBookings(data.data); // backend sends data in `data.data`
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchMyBooking();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Please login to view your bookings.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 sm:px-16 lg:px-24 xl:px-32 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img src={assets.empty_icon} alt="No Bookings" className="w-60 mb-6" />
          <p className="text-lg text-gray-600 mb-4">You don’t have any bookings yet.</p>
          <button
            onClick={() => navigate("/cars")}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Book Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id} // ✅ Added proper key
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={booking.car?.image || assets.empty_icon}
                alt={`${booking.car?.brand} ${booking.car?.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">
                  {booking.car?.brand} {booking.car?.model}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {booking.car?.category} • {booking.car?.transmission}
                </p>
                <p className="text-gray-800 font-medium mb-1">
                  ₹{booking.price}/day
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Booked from: {new Date(booking.pickupDate).toLocaleDateString()} -{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </p>

                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>

                <button
                  onClick={() => navigate(`/car-details/${booking.car?._id}`)}
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
