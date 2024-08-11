import express from "express";
import { DriverRegistration } from "../controller/DirverController";
const router = express.Router();


router.post("/driver/DriverReg",DriverRegistration);


export default router;