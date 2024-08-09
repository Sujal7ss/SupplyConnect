import express from 'express';
import { signup, login, logout } from '../controller/authController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", protectRoute, logout)

export default router;