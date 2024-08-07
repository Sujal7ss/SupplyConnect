import express from "express";
import { getSupplier, updateSupplier, createContract, deleteContract, getContract, updateContract } from "../controller/supplierUserController.js";

const router = express.Router();

// get and update supplier details
router.get("/getSupplier", getSupplier)
router.patch("/updateSupplier/:id", updateSupplier)

// post, get, and update contract details
router.post("/createContract", createContract)
router.delete("/deleteContract/:id", deleteContract)
router.get("/getContract/:id", getContract)
router.patch("/updateContract/:id", updateContract)

export default router;
