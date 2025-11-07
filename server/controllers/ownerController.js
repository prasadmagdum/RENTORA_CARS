import Car from '../models/Car.js'; 
import User from '../models/User.js';
import fs from 'fs';
import imagekit from "../configs/imagekit.js";
import Booking from '../models/booking.js';


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

    // Read image and upload to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars/",
    });

    // Generate optimized URL
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


// API to list Owner cars

export const getOwnerCars =   async (req, res) => {
  try {
    const{ _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, data: cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// API to  Toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const {_id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Car not found" });
    }       
    car.available = !car.available;
    await car.save();   
    res.json({ success: true, message: "Car availability updated", data: car });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// API to Delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Car not found" });
    }       
    car.owner=null
    car.isAvailable=false
    await car.save();   
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

// API to get dashboard data 

export const getDashboardData = async (req, res) => {
  try {
    const { _id , role} = req.user; 
    if (role !== 'owner') {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });
    
    const  pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
    const  confirmedBookings = await Booking.find({ owner: _id, status: 'confirmed' });

    // calculate monthlyRevenue from confirmed bookings
    const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc , booking) => acc + booking.price , 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };
    res.json({ success: true, data: dashboardData });


  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  }   
};

// API to update user profile

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
    // Generate optimized URL
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image });

    res.json({ success: true, message: "Profile image updated", data: { image } });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Server Error" });
  } 
};
  
