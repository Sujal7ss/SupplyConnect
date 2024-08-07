import express from "express";
import { getSupplier, updateSupplier, createOrder, deleteOrder, getOrder, updateOrder } from "../controller/supplierUserController.js";

const router = express.Router();

// get and update supplier details
router.get("/getSupplier", getSupplier)
router.patch("/updateSupplier/:id", updateSupplier)

// post, get, and update Order details
router.post("/createOrder", createOrder)
router.delete("/deleteOrder/:id", deleteOrder)
router.get("/getOrder/:id", getOrder)
router.patch("/updateOrder/:id", updateOrder)

export default router;
