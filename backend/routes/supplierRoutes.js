import express from "express";
import { createOrUpdateSupplierProfile, getSupplierProfile} from "../controller/supplierController.js";

const router = express.Router();

// Supplier
router.post('/supplier/createORupdate', createOrUpdateSupplierProfile);
router.get('/suppliers', getSupplierProfile);

export default router;
