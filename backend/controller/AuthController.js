import Supplier from '../models/supplier.js'
import Driver from '../models/Driver.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../lib/utils/generateTokenAndSetCookies.js';
import { ApiError } from '../lib/utils/error.js';
import { asyncHandler } from '../lib/utils/asyncHandler.js';
import { ApiResponse } from '../lib/utils/ApiResponse.js';

export const supplierSignup = async (req, res) => {
    try {
        const { name, email, password, type, companyName, address, phoneNo } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !type || !companyName || !address || !phoneNo) {
            return res.status(400).json(new ApiError(400, "Please provide all the required fields."));
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json(new ApiError(400, "Email is not valid."));
        }

        // Check for existing email
        const existingEmail = await Supplier.findOne({ email });
        if (existingEmail) {
            return res.status(400).json(new ApiError(400, "Email is already taken."));
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json(new ApiError(400, "Password must be at least 6 characters."));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new supplier
        const supplier = new Supplier({
            name,
            email,
            password: hashedPassword,
            type,
            companyName,
            address,
            phoneNo,
        });

        // Save the supplier and generate a token
        await supplier.save();
        let token = generateTokenAndSetCookie(supplier._id, supplier.type, res);
        supplier.password = undefined; // Remove password from response

        // Respond with success
        return res.status(201).json(new ApiResponse(201, { supplier, token }, "Supplier registration successful."));
        
    } catch (error) {
        console.error("Error in signup route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
}
// Driver Signup Controller
export const driverSignup = async (req, res) => {
    try {
        const { name, email, password, type, dob, gender, address, drivingLicense, adhaarCard, registrationNumber, vehicleType, tnc, health } = req.body;
        if (!name || !email || !password || !type || !dob || !gender || !address || !drivingLicense || !adhaarCard || !registrationNumber || !vehicleType || !tnc || !health) {
            return res.status(400).json(new ApiError(400, "Please provide all the fields."));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json(new ApiError(400, "Email is not valid."));
        }

        const existingEmail = await Supplier.findOne({ email });
        if (existingEmail) {
            return res.status(400).json(new ApiError(400, "Email is already taken."));
        }

        if (password.length < 6) {
            return res.status(400).json(new ApiError(400, "Password must be at least 6 characters."));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const driver = new Driver({
            name,
            email,
            password: hashedPassword,
            type,
            dob,
            gender,
            address,
            documents: {
                drivingLicense,
                adhaarCard,
            },
            vehicle: {
                registrationNumber,
                vehicleType,
            },
            agreements: {
                tnc,
                health,
            },
        });

        if (driver) {
            let token = generateTokenAndSetCookie(driver._id, driver.type, res);
            await driver.save();
            driver.password = undefined;
            return res.status(200).json(new ApiResponse(200, { driver, token }, "Login successful."));
        } else {
            return res.status(400).json(new ApiError(400, "Invalid user data."));
        }
    } catch (error) {
        console.log("Error in signup route:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
        
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, type } = req.body;
        if (!email || !password || !type) {
            return res.status(400).json(new ApiError(400, "Please provide all the fields."));
        }

        if(type === 'supplier'){
            const supplier = await Supplier.findOne({ email });
            if (!supplier) {
                return res.status(400).json(new ApiError(400, "User not found."));
            }

            const isMatch = await bcrypt.compare(password, supplier?.password || "");
            if (!isMatch) {
                return res.status(400).json(new ApiError(400, "Invalid credentials."));
            }

            supplier.password = undefined;
            let token = generateTokenAndSetCookie(supplier._id, supplier.type, res);
            return res.status(200).json(new ApiResponse(200, {supplier,token, useType: "supplier"}, "Login successful."));
        }
        else if(type === 'driver'){
            const driver = await Driver.findOne({ email });
            if (!driver) {
                return res.status(400).json(new ApiError(400, "User not found."));
            }
            const isMatch = await bcrypt.compare(password, driver?.password || "");
            if (!isMatch) {
                return res.status(400).json(new ApiError(400, "Invalid credentials."));
            }
            driver.password = undefined;
            let token = generateTokenAndSetCookie(driver._id, driver.type, res);
            return res.status(200).json(new ApiResponse(200, {driver,token, useType: "driver"}, "Login successful."));
        }
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
