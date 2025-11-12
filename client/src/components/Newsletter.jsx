import React, { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate subscription success
    toast.success("Subscribed successfully 🎉");
    setEmail(""); // clear input
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 max-md:px-4 my-10 mb-40">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>

      <p className="md:text-lg text-gray-500/70 max-w-2xl">
        Subscribe to our newsletter and be the first to know about exclusive
        offers, new arrivals, and exciting updates from Rentora. Join our
        community of car enthusiasts and stay ahead of the curve!
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
        />

        <button
          type="submit"
          className="bg-black text-white px-8 md:px-12 h-full rounded-md rounded-l-none hover:bg-gray-800 transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
