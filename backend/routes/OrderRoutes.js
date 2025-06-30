import express from "express";
import { getAllOrders, createOrder, getBidsForOrder, MyOrders, orderDetails, updateorderdetails } from "../controller/OrderController.js"
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post('/createNewOrder' , authenticate,  createOrder);
// router.get('/orders/:orderId', orderDetails);
// router.put('/orders/:orderId', updateorderdetails);
// router.get('/orders', getAllOrders);
// router.post('/myOrder', MyOrders);
// router.put('/orders/getbids/:orderId', getBidsForOrder);


export default router;