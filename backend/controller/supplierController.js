import Supplier from '../models/supplier.js';
import Order from '../models/order.js';

// Supplier Controller Functions

// Create or Update Supplier Profile
export const createOrUpdateSupplierProfile = async (req, res) => {
    try {
        const { companyName, address, phoneNo, email } = req.body;
        const supplierId = req.user._id;
        if(!companyName || !address || !phoneNo) {
            return res.status(400).json({ error : 'All fields are required'});
        }
        let supplier = await Supplier.findOneAndUpdate(
            { email },
            { companyName, address, phoneNo }
        );
        if (!supplier) {
            supplier = new Supplier({ supplierId, companyName, address, phoneNo, email });
            await supplier.save();
        }
        res.status(200).json(supplier);
    } catch (error) {
        console.log("Error in createOrUpdateSupplierProfile controller : ", error.message);
        res.status(500).json({ error : error.message });
    }
}

// Get Supplier Profile
export const getSupplierProfile = async (req, res) => {
    try {
        const supplierId = req.user._id;
        const supplier = await Supplier.findOne({supplierId: supplierId});
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(supplier);
    } catch (error) {
        console.log("Error in getSupplierProfile controller : ", error.message);
        res.status(500).json({ error : error.message });
    }
}

// Order Controller Functions

// Create a New Order
export const createNewOrder = async (req, res) => {
    try {
        const { pickUpLocation, deliveryLocation, pickUpTime, deliveryTime, orderAmount } = req.body;
        const supplierId = req.user._id;
        const order = new Order({
            supplierId,
            pickUpLocation,
            deliveryLocation,
            orderStatus : 'waiting',
            pickUpTime,
            deliveryTime,
            orderAmount
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.log("Error in createNewOrder controller", error.message);
        res.status(500).json({ error : error.message });
    }
}

// Get All Orders for a Supplier
export const getAllOrdersForSupplier = async (req, res) => {
    try {
        const supplierId = req.params.supplierId;
        const userId = req.user._id;
        if(supplierId !== userId.toString()) {
            return res.status(401).json({ error : 'Unauthorized order details' });
        }
        const orders = await Order.find({ supplierId: supplierId });
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error in getAllOrdersForSupplier controller : ", error.message);
        res.status(500).json({ error : error.message });
    }
}

// Get Details of a Specific Order
export const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const userId = req.user._id;
        
        const order = await Order.findById(orderId);      
        if(order.supplierId.toString() !== userId.toString()) {
            return res.status(401).json({ error : 'Unauthorized order deatils' });
        }
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        console.log("Error in getOrderDetails controller : ", error.message);
        res.status(500).json({ error : error.message });
    }
}

// Update Order Status, Assign a Driver
export const updateOrder = async (req, res) => {
    try {
        console.log("Update Order");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get Bids for a Specific Order
export const getBidsForOrder = async (req, res) => {
    try {
        console.log("Get Bids for Order");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Assign a Driver to an Order
export const setBidToOrder = async (req, res) =>{
    try {
        console.log("Set Bid to Order");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get the Current Location of the Driver
export const getDriverLocation = async (req, res) => {
    try {
        console.log("Get Driver Location");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
