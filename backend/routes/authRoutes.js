import express from "express";
import { login, register } from "../controllers/authController.js";

import { loginRateLimit } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', loginRateLimit, login);
router.post('/register', register);

export default router;