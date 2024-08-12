import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
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
    type: {
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
