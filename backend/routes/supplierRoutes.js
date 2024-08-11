import express from "express";
import { createOrUpdateSupplierProfile, getSupplierProfile} from "../controller/supplierController.js";

const router = express.Router();

// Supplier
router.post('/supplier', createOrUpdateSupplierProfile);
router.get('/suppliers/:supplierId', getSupplierProfile);

export default router;
