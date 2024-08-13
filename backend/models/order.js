import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: false,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    deliveryLocation: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["waiting", "picked", "delivered"],
      required: true,
    },
    pickUpTime: {
      type: Date,
      required: true,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    orderAmount: {
      type: Number,
      required: true,
    },
    AssignedAmount: {
      type: Number,
      required : true, 
    },
    city : {
      type : String,
      required : true,
    }
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
