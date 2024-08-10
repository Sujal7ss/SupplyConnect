import express from "express";
import { createOrUpdateSupplierProfile, getSupplierProfile, createNewOrder, getAllOrdersForSupplier, getOrderDetails, updateOrder, getBidsForOrder, setBidToOrder, getDriverLocation} from "../controller/supplierController.js";

const router = express.Router();

// Supplier
router.post('/supplier', createOrUpdateSupplierProfile);
router.get('/suppliers/:supplierId', getSupplierProfile);

// Order by Supplier
router.post('/supplier/orders', createNewOrder);
router.get('/supplier/orders/:supplierId', getAllOrdersForSupplier);
router.get('/orders/:orderId', getOrderDetails);

// done till here
// work pending from here

router.put('/orders/:orderId', updateOrder);
router.get('/orders/:orderId/bids', getBidsForOrder);
router.post('/orders/:orderId/bids', setBidToOrder);
router.get('/orders/:orderId/driver-location', getDriverLocation);


export default router;
