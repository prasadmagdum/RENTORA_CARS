import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'

  const [data, setData] = useState({
    totalCars: 0,
    totalBooking: 0,
    pendingBooking: 0,
    completeBookings: 0,
    recentBooking: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Booking", value: data.totalBooking, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBooking, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completeBookings, icon: assets.listIconColored },
  ]

  useEffect(() => {
    // In future, replace with API call like: API.get('/owner/dashboard')
    setData(dummyDashboardData)
  }, [])

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full bg-white shadow-sm">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500 text-sm">Latest customer bookings</p>

          {data.recentBooking && data.recentBooking.length > 0 ? (
            data.recentBooking.map((booking, index) => (
              <div
                key={index}
                className="mt-4 flex items-center justify-between border-b border-borderColor pb-2 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <img src={assets.listIconColored} alt="Booking Icon" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {booking.car?.brand || 'Unknown'} {booking.car?.model || ''}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.createdAt ? booking.createdAt.split('T')[0] : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-medium">
                  <p className="text-sm text-gray-700">
                    {currency} {booking.price || 0}
                  </p>
                  <p
                    className={`px-3 py-0.5 border rounded-full text-sm ${
                      booking.status === 'pending'
                        ? 'border-yellow-400 text-yellow-600'
                        : booking.status === 'confirmed'
                        ? 'border-green-400 text-green-600'
                        : 'border-gray-400 text-gray-600'
                    }`}
                  >
                    {booking.status || 'N/A'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500 text-sm">No recent bookings found.</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md bg-white shadow-sm">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500 text-sm mb-2">Total revenue generated this month</p>
          <h2 className="text-2xl font-semibold text-primary">
            {currency} {data.monthlyRevenue.toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
