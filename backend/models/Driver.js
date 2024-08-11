import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  Driver_Detail: {
    PersonalDetails: {
      Name: { type: String, required: true },
      DOB: {
        type: Date,
        required: true,
      },
      Gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true,
      },
      Contact: {
        Phone: Number,
        Email: {
          type : String
        },
      },
      Address: String,
    },
    Document: {
      DrivingLicense: {
        LicenseNumber: String,
        ExpiryDate: Date,
      },
      IdCard: {
        AadharNumber: String,
        Verfied: Boolean,
      },
    },
  },
  VehicleDetails: {
    VehicleRegistrationNumber: String,
    MakeModel: String,
    Color: String,
    Year: Number,
    Insurance: {
      PolicyNumber: String,
      ExpiryDate: Date,
    },
  },
  AgreementAndConscent: {
    TnCAgreement: String,
    DataPrivacyConsent: String,
    HealthAndSafty: String,
  },
});

export default mongoose.model("Drivers", DriverSchema);
