// src/pages/MyBooking.jsx
import React, { useEffect, useState } from "react";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("bookings");
    setBookings([]);
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32 mt-16 mb-16">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

      {bookings.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((b, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{b.carName}</h2>
                <p className="text-gray-600 mb-1">Name: {b.name}</p>
                <p className="text-gray-600 mb-1">Email: {b.email}</p>
                <p className="text-gray-600 mb-1">Date: {b.date}</p>
                <p className="text-gray-800 font-semibold mt-3">
                  ${b.price} / day
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Clear All Bookings
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          You haven’t booked any cars yet.
        </p>
      )}
    </div>
  );
};

export default MyBooking;
