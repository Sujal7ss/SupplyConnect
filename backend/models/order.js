import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        supplierId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true,
        },
        driverId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
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
        bids: [
            {
              driverId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Driver',
              },
              bidAmount: {
                type: Number,
                required: true,
              },
              bidTime: {
                type: Date,
                default: Date.now,
              },
              status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                default: "pending",
              },
            }
          ],
          driverLocation: {
            type: {
              lat: { type: Number, required: true },
              lng: { type: Number, required: true },
            },
            required: false,
          },
          chat: [
            {
              senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
              },
              message: {
                type: String,
                required: true,
              },
              sentAt: {
                type: Date,
                default: Date.now,
              },
            },
          ],
        },{ timestamps: true }
)

export const Order = mongoose.model('Order', orderSchema);