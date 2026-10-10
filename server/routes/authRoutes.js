import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";
import { signUp, signIn, getProfile } from "../controller/AuthController.js";

const router = Router();

router.post("/api/auth/signup", signUp);

router.post("/api/auth/signIn", signIn);

router.get("/api/auth/profile", authMiddleware, getProfile);

export default router;
