import express from 'express';
import { registerUser, loginUser, getUserData } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/data', protect, getUserData);

export default userRoutes;
