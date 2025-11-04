 import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// Generate JWT Token
const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, );
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