import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNo : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

export default mongoose.model('Supplier', supplierSchema);