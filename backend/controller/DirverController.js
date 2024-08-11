import { ApiResponse } from "../lib/utils/ApiResponse.js";
import { ApiError } from "../lib/utils/error.js";
import Driver from "../models/Driver.js";


export const DriverRegistration = async (req, res) => {
  try {
    const {
      name,
      dob,
      gender,
      phone,
      email,
      address,
      licenseNumber,
      expiryDate,
      aadhar,
      v,
      tnc,
      dpc,
      has,
    } = req.body;

    // Check for required fields
    if (
      !name ||
      !dob ||
      !gender ||
      !phone ||
      !email ||
      !address ||
      !licenseNumber ||
      !aadhar ||
      !v ||
      !tnc ||
      !dpc ||
      !has
    ) {
      return res.status(400).json(new ApiError(400, "Please provide all the required fields."));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(new ApiError(400, "Email is not valid."));
    }

    // Check if email is already registered
    const existingEmail = await Driver.findOne({ email });
    if (existingEmail) {
      return res.status(400).json(new ApiError(400, "Email is already registered."));
    }

    // Check if phone number is already registered
    const existingPhone = await Driver.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json(new ApiError(400, "Phone number is already registered."));
    }

    // Create Driver instance
    const DriverInstance = {
      driverId: req.user._id,
      Driver_Detail: {
        PersonalDetails: {
          Name: name,
          DOB: dob,
          Gender: gender,
          Contact: {
            Phone: phone,
            Email: email,
          },
          Address: address,
        },
        Document: {
          DrivingLicense: {
            LicenseNumber: licenseNumber,
            ExpiryDate: expiryDate,
          },
          IdCard: {
            AadharNumber: aadhar,
            Verified: false,
          },
        },
      },
      VehicleDetails: {
        VehicleRegistrationNumber: v.vehicleRegistrationNumber,
        MakeModel: v.mam,
        Color: v.color,
        Year: v.year,
        Insurance: {
          PolicyNumber: v.policyNumber,
        },
      },
      AgreementAndConscent: {
        TnCAgreement: tnc,
        DataPrivacyConsent: dpc,
        HealthAndSafety: has,
      },
    };

    // Save the new driver to the database
    const driver = new Driver(DriverInstance);
    await driver.save();

    // Respond with success
    res.status(201).json(new ApiResponse(201, driver, "Driver registered successfully!"));

  } catch (error) {
    console.log("Error in Driver Signup route: ", error.message);
    res.status(500).json(new ApiError(500, "Internal server error."));
  }
};


// const testdata = {
//   name: "sujal",
//   dob: Date.now(),
//   gender: "M",
//   phone: 7894561234,
//   emial: "xyz@hotmail.com",
//   address: "Room me hi rhta hai",
//   licenseNumber: "CG154654681213",
//   expiryDate: Date.now(),
//   aadhar: "4543157141254",
//   v: {
//     vehicleRegistrationNumber: "CG28 K 0930",
//     mam: "Bajaj Pulsar 150",
//     year: 2019,
//     color: "black",
//     policyNumber: "00000078451234548",
//   },
//   tnc: true,
//   has: true,
//   dpc: true,
// };
