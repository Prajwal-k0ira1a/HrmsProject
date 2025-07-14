import express from "express";
import login from "../controllers/authController.js";
import { loginRateLimit } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', loginRateLimit, login);
export default router;

