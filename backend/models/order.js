import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  weight: { type: String, required: true },
});

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    title: { type: String, required: true },
    description: { type: String, required: true },

    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    pickupCoordinates: { type: coordinatesSchema, required: true },
    deliveryCoordinates: { type: coordinatesSchema, required: true },

    items: [itemSchema],

    totalWeight: { type: String, required: true },
    dimensions: { type: String, required: true },

    expectedPickupDate: { type: Date, required: true },
    expectedDeliveryDate: { type: Date, required: true },

    budget: { type: Number, required: true },

    distance: { type: String, required: true }, // e.g., "291.63"
    duration: { type: String, required: true }, // e.g., "4 hours 40 minutes"

    orderStatus: {
      type: String,
      enum: ["waiting", "assigned", "in_transit", "delivered", "cancelled"],
      default: "waiting",
    },
  },
  { timestamps: true }
);


const Order = mongoose.model("Order", orderSchema);
export default Order
