import express from 'express';
import { protect } from '../middleware/auth.js';
import { changeRoleToOwner, addCar, getOwnerCars , toggleCarAvailability , deleteCar } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';
import { get } from 'mongoose';

const ownerRoutes = express.Router();

ownerRoutes.post("/change-role", protect, changeRoleToOwner);
ownerRoutes.post("/add-car",protect, upload.single("image"),addCar);
ownerRoutes.get("/cars", protect , getOwnerCars);
ownerRoutes.post("/toggle-car", protect , toggleCarAvailability);
ownerRoutes.post("/delete-car", protect , deleteCar);

export default ownerRoutes;
