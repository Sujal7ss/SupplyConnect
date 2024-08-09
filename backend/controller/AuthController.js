import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { ApiError } from '../lib/utils/error.js';


export const signup = async (req,res) =>{
    try {
        const {name, email, password, type} = req.body;
        if(!name || !email || !password || !type){
            res.status(400).json(new ApiError(400, "Please Provide all the fields"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json(new ApiError(400, "Email is not valid."));
        }
        
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json(new ApiError(400, "Email is already taken"));
		}

        if(password.length < 6){
            return res.status(400).json(new ApiError(400, "Password must be at least 6 characters.")); 
        }
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword, type });
        
        if(user){
            generateTokenAndSetCookie(user._id, res);
            await user.save();
            user.password = undefined;
            res.status(201).json({ user });
        } else {
            res.status(400).json({ message: "Invalid user data."})
        }
    } catch (error) {
        console.log("Error in signup route : ", error.message);
        res.status(500).json({ message: "Internal server error."})
    }
}

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User not found."})
        }
        const isMatch = await bcrypt.compare(password, user?.password || ""); 
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials."})
        }
        user.password = undefined;
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error in login route : ", error.message);
        res.status(500).json({ message: "Internal server error."})
    }
}

export const logout = async (req,res) =>{
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully."})
    }
    catch (error) {
        console.log("Error in logout route : ", error.message);
        res.status(500).json({ message: "Internal server error."})
    }
}
