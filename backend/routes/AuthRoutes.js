import express from 'express';
import { register, login, logout, getcurrUser } from '../controller/AuthController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getuser", protectRoute, getcurrUser)

export default router;