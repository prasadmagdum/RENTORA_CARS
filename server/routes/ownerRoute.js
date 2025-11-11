import express from 'express';
import { protect } from '../middleware/auth.js';
import { changeRoleToOwner, addCar, getOwnerCars , toggleCarAvailability , deleteCar, getDashboardData, updateuserImage,  getOwnerBookings } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';
import { get } from 'mongoose';

const ownerRoutes = express.Router();

ownerRoutes.post("/change-role", protect, changeRoleToOwner);
ownerRoutes.post("/add-car",protect, upload.single("image"),addCar);
ownerRoutes.get("/cars", protect , getOwnerCars);
ownerRoutes.post("/toggle-car", protect , toggleCarAvailability);
ownerRoutes.post("/delete-car", protect , deleteCar);
ownerRoutes.get("/dashboard", protect, getDashboardData);
ownerRoutes.post("/update-image", protect, upload.single("image"), updateuserImage);
ownerRoutes.get("/bookings", protect, getOwnerBookings);



export default ownerRoutes;
