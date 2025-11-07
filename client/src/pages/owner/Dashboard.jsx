import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {

  const [data , setData]= useState({
    totalCars:0,
    totalBooking:0,
    pendingBooking:0,
    complteBookings:0,
    recetBooking:[],
    monthlyRevenue:0,


  })

  const dashboardCards =[
    {title: "Total Cars", value:data.totalCars, icon:assets.carIconColored},
    { title: "Total Booking", value:data.totalBooking, icon:assets.listIconColored},
    {title: "Pending", value:data.pendingBookings, icon:assets.cautionIconColored},
    {title: "confirmed", value:data.complteBookings, icon:assets.listIconColored},
  ]

  useEffect(()=>{
    setData(dummyDashboardData)
  },[])


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard