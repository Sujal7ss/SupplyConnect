import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
    {
        supplierId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        contractStatus: {
            type: String,
            enum: ["waiting", "picked", "dropped"],
            required: true,
        },
    },{ timestamps: true }
)

export default mongoose.model('Contract', contractSchema);