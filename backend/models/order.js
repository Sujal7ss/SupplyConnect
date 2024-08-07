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
            required: true,
        },
        pickUpLocation: {
            type: String,
            required: true,
        },
        DeliveryLocation: {
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
    },{ timestamps: true }
)

export default mongoose.model('Order', orderSchema);