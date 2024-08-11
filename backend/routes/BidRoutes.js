import express from "express";
import { addBid, bidToBeAssigned, GenerateBid } from "../controller/bidcontroller.js";
const router = express.Router();

router.post('/Order/bid', GenerateBid);
router.get('/Order/:OrderId', bidToBeAssigned);
router.post('/addBid/:orderId', addBid);

export default router;