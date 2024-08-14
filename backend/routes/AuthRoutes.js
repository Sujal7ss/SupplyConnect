import express from 'express';
import { supplierSignup, driverSignup, login, logout, getcurrUser } from '../controller/AuthController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/signup/supplier", supplierSignup)
router.post("/signup/driver", driverSignup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getuser", protectRoute, getcurrUser)

export default router;