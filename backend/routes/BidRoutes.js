import express from "express";
import { bidToBeAssigned, GenerateBid } from "../controller/bidcontroller";
const router = express.Router();

router.post('/Order/bid', GenerateBid);
router.get('/Order/:bidId', bidToBeAssigned);


export default router;