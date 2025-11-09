 import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js"



// Generate JWT Token
const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

 export const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;   

        if(!name || !email || !password || password.length < 8){
            return res.json({ success: false, message: "Invalid input data" });
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = generateToken(user._id.toString());
        res.json({ success: true, data: { token } });




    }
    catch(error){
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });

    }
    };
    
// Login User
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body; 
        const user = await User.findOne({ email });
        if(!user){
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(user._id.toString());
        res.json({ success: true, data: { token } });
    }
    catch(error){
        console.log(error.message);
        res.json({ success: false, message: "Server Error" });
    }
};

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Get All cars for Frontend

export const getCars = async (req, res) => {
  try {
    const cars=await Car.find({isAvailable:true})
    res.json({success:true,cars})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};