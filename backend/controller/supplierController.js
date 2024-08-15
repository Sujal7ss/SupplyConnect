import { ApiError } from '../lib/utils/error.js';
import { ApiResponse } from '../lib/utils/ApiResponse.js';
// import User from '../models/user.js';
import Supplier from '../models/supplier.js';  // Capitalize the model name as it represents a class

// Supplier Controller Functions

// Create or Update Supplier Profile
export const updateSupplierProfile = async (req, res) => {
    try {
        const { companyName, address, phoneNo } = req.body;
        const supplierId = req.user._id;

        // Validate required fields
        if (!companyName || !address || !phoneNo) {
            return res.status(400).json(new ApiError(400, "All fields are required."));
        }

        // Find and update supplier, or create new if it doesn't exist
        let supplier = await Supplier.findOneAndUpdate(
            { supplierId },
            { companyName, address, phoneNo },
            { new: true, upsert: true, runValidators: true }
        );

        // If the supplier was created anew
        if (!supplier) {
            supplier = new Supplier({ supplierId, companyName, address, phoneNo});
            await supplier.save();
        }

        return res.status(200).json(new ApiResponse(200, supplier, "Supplier profile created/updated successfully."));
    } catch (error) {
        console.log("Error in createOrUpdateSupplierProfile controller:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
}

// Get Supplier Profile
export const getSupplierProfile = async (req, res) => {
    try {
        // Ensure req.user and _id exist
        if (!req.user || !req.user._id) {
            return res.status(400).json(new ApiError(400, "Unauthorized: User ID not found."));
        }
        const supplierId = req.user._id; // This is the ObjectId you have
        
        console.log(supplierId)
        // Find supplier by supplierId
        const supplier = await User.findById(supplierId); // Using findById for cleaner code
        if (!supplier) {
            return res.status(404).json(new ApiError(404, "Supplier not found."));
        }

        return res.status(200).json(new ApiResponse(200, supplier, "Supplier profile fetched successfully."));
    } catch (error) {
        console.error("Error in getSupplierProfile controller:", error.message);
        return res.status(500).json(new ApiError(500, "Internal server error."));
    }
};
