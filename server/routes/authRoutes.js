
import {Router} from "express"
import { signUp, signIn } from "../controller/AuthController.js";

const router = Router();

router.post("/api/auth/signup",signUp);

router.post("/api/auth/signIn", signIn);


export default router;