import express from "express";
import { allorders, CreateOrder, getBidsForOrder, MyOrders, orderDetails, updateorderdetails } from "../controller/OrderController"

const router = express.Router();

router.post('/orders/CreateNewOrder' ,  CreateOrder);
router.get('/orders/:orderId', orderDetails);
router.put('/orders/:orderId', updateorderdetails);
router.get('/orders/allOrders', allorders);
router.post('/orders/myOrder', MyOrders);
router.get('/orders/getbids/:orderId', getBidsForOrder);


export default router;