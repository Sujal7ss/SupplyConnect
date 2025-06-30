import Supplier from '../models/supplier.js'
import User from '../models/user.js'
import Driver from '../models/Driver.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generateTokenAndSetCookies.js';
import { ApiError } from '../lib/utils/error.js';
import { asyncHandler } from '../lib/utils/AsyncHandler.js';
import { ApiResponse } from '../lib/utils/ApiResponse.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const {name, email,  password, confirmPassword , role ,phone, address} = req.body;
        console.log(req.body)
        // Check for missing fields
        if (!name || !email || !password || !confirmPassword || !address || !role ||  !phone) {
            return res.status(400).json(new ApiError(400, "Please provide all the required fields."));
        }

        // Check for existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json(new ApiError(400, "Email is already taken."));
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            address,
            phone,
        });

        // Save the user and generate a token
        await user.save();
        generateTokenAndSetCookie(user._id, user.role, res);
        user.password = undefined; // Remove password from response

        // Respond with success
        return res.status(201).json(new ApiResponse(201, user, "Supplier registration successful."));
        
    } catch (error) {
        console.error("Error in signup route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
}


export const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Please provide all the fields."));
        }

        const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json(new ApiError(400, "User not found."));
            }
            const isMatch = await bcrypt.compare(password, user?.password || "");
            if (!isMatch) {
                return res.status(400).json(new ApiError(400, "Invalid credentials."));
            }
            user.password = undefined;
            generateTokenAndSetCookie(user._id, user.role, res);

            return res.status(200).json(new ApiResponse(200, user, "Login successful."));
        
    } catch (error) {
        console.log("Error in login route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.cookie('typeofUser', '', { maxAge: 0 });
        return res.status(200).json(new ApiResponse(200, null, "Logged out successfully."));
    } catch (error) {
        console.log("Error in logout route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
}

export const getcurrUser = asyncHandler(async (req, res) => {
    try {
        let userdata = req.user;
        if (!userdata) {
            return res.status(401).json(new ApiError(401, "User not authenticated."));
        }
        return res.status(200).json(new ApiResponse(200, userdata, "Fetched user details successfully."));
    } catch (error) {
        console.log("Error in getcurrUser route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
});
