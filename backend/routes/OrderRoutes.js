import express from "express";
import { allorders, CreateOrder, getBidsForOrder, MyOrders, orderDetails, updateorderdetails } from "../controller/OrderController.js"

const router = express.Router();

router.post('/orders/CreateNewOrder' ,  CreateOrder);
router.get('/orders/:orderId', orderDetails);
router.put('/orders/:orderId', updateorderdetails);
router.get('/orders/allorders', allorders);
router.post('/orders/myOrder', MyOrders);
router.put('/orders/getbids/:orderId', getBidsForOrder);


export default router;