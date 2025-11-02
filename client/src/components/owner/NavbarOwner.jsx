import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavbarOwner = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ownerToken");
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/owner/dashboard" },
    { name: "Bookings", path: "/owner/bookings" },
    { name: "Cars", path: "/owner/cars" },
    { name: "Customers", path: "/owner/customers" },
  ];

  return (
    <nav className="bg-black text-white px-6 sm:px-12 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link
        to="/owner/dashboard"
        className="text-2xl font-bold tracking-wide hover:text-gray-300"
      >
        Rentora<span className="text-yellow-400">Owner</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="hover:text-yellow-400 transition duration-200"
          >
            {link.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden z-50">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 transition duration-200 text-lg"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="bg-yellow-400 text-black px-6 py-2 rounded-md font-medium hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarOwner;
