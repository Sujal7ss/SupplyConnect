import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Chat', chatSchema);