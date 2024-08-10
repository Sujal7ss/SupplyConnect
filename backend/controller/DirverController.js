import Driver from "../models/Driver";
const { v4: uuidv4 } = require("uuid");

const DriverRegistration = async (req, res) => {
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
      res.status(400).json(new ApiError(400, "Please Provide all the fields"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json(new ApiError(400, "Email is not valid."));
    }

    const existingEmail = await Driver.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json(new ApiError(400, "Email is already registered"));
    }

    const existingPhone = await Driver.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json(new ApiError(400, "Phone Number is already registered"));
    }

    const DriverInstance = {
      driverId: uuidv4(),
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
            Verfied: false,
          },
        },
      },
      VehicleDetails: {
        VehicleRegistrationNumber: v.vehicleRegistrationNumber,
        MakeModel: v.mam,
        Color: data.v.color,
        Year: data.v.year,
        Insurance: {
          PolicyNumber: v.policyNumber,
        },
      },
      AgreementAndConscent: {
        TnCAgreement: data.tnc,
        DataPrivacyConsent: data.dpc,
        HealthAndSafty: data.has,
      },
    };
    const driver = new Driver(DriverInstance);
    if (driver) {
      await driver.save();
      res.status(201).json({ driver });
    }
  } catch (error) {
    console.log("Error in Driver Signup route : ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const testdata = {
  name: "sujal",
  dob: Date.now(),
  gender: "M",
  phone: 7894561234,
  emial: "xyz@hotmail.com",
  address: "Room me hi rhta hai",
  licenseNumber: "CG154654681213",
  expiryDate: Date.now(),
  aadhar: "4543157141254",
  v: {
    vehicleRegistrationNumber: "CG28 K 0930",
    mam: "Bajaj Pulsar 150",
    year: 2019,
    color: "black",
    policyNumber: "00000078451234548",
  },
  tnc: true,
  has: true,
  dpc: true,
};
