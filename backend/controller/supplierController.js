import Supplier from '../models/supplier.js';
import Order from '../models/order.js';
import Driver from '../models/Driver.js';

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

export const setBidToOrder = asyncHandler(async (req, res) => {
    try {
      // I will get { bidid , Orderid , driverid };
      let { orderId } = req.params;
      let { bidId , driverId } = req.body();
      if(!orderId || !bidId || !driverId){
          res.status(400).json(new ApiError(400,"All Fields Required"));
      }
      orderId = await Order.find({_id : orderId});
      if(!orderId){
         return res.status(400).json(new ApiError(400,"Invalid OrderID"));
      }
      bidId = await Bid.find({bidId : bidId });
      if(!bidId){
          return res.status(400).json(new ApiError(400,"Invalid BidID"));
      }
      driverId = await Driver.find({driverId : driverId });
      if(!driverId){
          return res.status(400).json(new ApiError(400,"Invalid DriverID"));
      }

      

    } catch (error) {
      res.status(500).json(new ApiError(500,error.message));
    }
});