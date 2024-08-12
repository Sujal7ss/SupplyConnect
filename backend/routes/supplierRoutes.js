import express from "express";
import { updateSupplierProfile, getSupplierProfile} from "../controller/supplierController.js";

const router = express.Router();

// Supplier
router.post('/supplier/update', updateSupplierProfile);
router.get('/suppliers', getSupplierProfile);

export default router;
