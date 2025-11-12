import Car from '../models/Car.js'; 
import User from '../models/User.js';
import fs from 'fs';
import imagekit from "../configs/imagekit.js";
import Booking from '../models/Booking.js';

// Change user role to Owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: 'owner' });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// Add car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const carData = JSON.parse(req.body.carData);
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Upload to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars/",
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const newCar = await Car.create({
      ...carData,
      owner: _id,
      image: optimizedImageUrl,
    });

    res.json({
      success: true,
      message: "Car listed successfully",
      car: newCar,
    });

  } catch (error) {
    console.log("Error in addCar:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

// List Owner Cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// ✅ Toggle Car Availability (Fixed)
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Car availability updated", data: car });
  } catch (error) {
    console.log("Error in toggleCarAvailability:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Car (Fixed)
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    // Delete the car document from DB (hard delete)
    await Car.findByIdAndDelete(carId);

    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCar:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBooking = bookings.filter(b => b.status === "pending");
    const confirmedBooking = bookings.filter(b => b.status === "confirmed");

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const monthlyRevenueBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
      updatedAt: { $gte: startOfMonth, $lt: endOfMonth },
    });

    const monthlyRevenue = monthlyRevenueBookings.reduce(
      (sum, b) => sum + (b.price || 0),
      0
    );

    const dashboardData = {
      totalCars: cars.length,
      totalBooking: bookings.length,
      pendingBooking: pendingBooking.length,
      completeBookings: confirmedBooking.length,
      recentBooking: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    console.log("Dashboard error:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// Get Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {
    console.log("Error in getOwnerBookings:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// Update user image
export const updateuserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users/",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await User.findByIdAndUpdate(_id, { image: optimizedImageUrl });

    res.json({
      success: true,
      message: "Profile image updated",
      data: { image: optimizedImageUrl },
    });
  } catch (error) {
    console.log("Error in updateuserImage:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};
