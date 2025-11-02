import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/owner/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Cars", path: "/owner/cars", icon: <Car size={20} /> },
    { name: "Bookings", path: "/owner/bookings", icon: <ClipboardList size={20} /> },
    { name: "Customers", path: "/owner/customers", icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-black text-white min-h-screen flex flex-col transition-all duration-300 fixed left-0 top-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <h1
          className={`text-xl font-bold transition-all duration-300 ${
            !open && "opacity-0 pointer-events-none"
          }`}
        >
          Rentora<span className="text-yellow-400">Owner</span>
        </h1>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-col mt-6 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md hover:bg-yellow-400 hover:text-black transition ${
              location.pathname === item.path ? "bg-yellow-400 text-black" : ""
            }`}
          >
            {item.icon}
            <span
              className={`text-sm font-medium transition-all duration-200 ${
                !open && "hidden"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-auto px-4 py-4 border-t border-gray-700">
        <button
          className="flex items-center gap-3 w-full text-left text-red-400 hover:text-red-500 transition"
          onClick={() => {
            localStorage.removeItem("ownerToken");
            window.location.href = "/login";
          }}
        >
          <LogOut size={20} />
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
