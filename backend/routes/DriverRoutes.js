import express from "express";
import { DriverRegistration } from "../controller/DirverController.js";
import {getAllOrders} from "../controller/OrderController.js"
const router = express.Router();


router.post("/DriverReg",DriverRegistration);
router.get("/getAllOrders", getAllOrders)

export default router;