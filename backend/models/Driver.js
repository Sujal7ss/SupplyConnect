import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['supplier', 'driver'],
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  documents: {
    drivingLicense: {
      type: String,
      required: true,
    },
    adhaarCard: {
      type: String,
      required: true,
    },
  },
  vehicle: {
    registrationNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
  },
  agreements: {
    tnc:{
      type: Boolean,
      required: true,
    },
    health: {
      type: Boolean,
      required: true,
    },
  },
});

export default mongoose.model("Drivers", DriverSchema);
