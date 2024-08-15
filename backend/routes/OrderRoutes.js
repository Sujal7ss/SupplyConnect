import express from "express";
import { getAllOrders, CreateOrder, getBidsForOrder, MyOrders, orderDetails, updateorderdetails } from "../controller/OrderController.js"

const router = express.Router();

router.post('/orders/CreateNewOrder' ,  CreateOrder);
router.get('/orders/:orderId', orderDetails);
router.put('/orders/:orderId', updateorderdetails);
router.get('/orders', getAllOrders);
router.get('/myOrder', MyOrders);
router.put('/orders/getbids/:orderId', getBidsForOrder);


export default router;