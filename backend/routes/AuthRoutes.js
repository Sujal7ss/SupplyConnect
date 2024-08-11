import express from 'express';
import { signup, login, logout, getcurrUser } from '../controller/AuthController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", protectRoute, logout)
router.get("/getuser",protectRoute,getcurrUser)

export default router;