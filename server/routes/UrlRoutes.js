
import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {createShortUrl, deleteUrl, getAllUrl, getUrlByCode, redirectUrl, updateUrl} from "../controller/UrlController.js";

const router = Router();

router.post("/api/urls", authMiddleware ,createShortUrl);

router.get("/:shortCode", redirectUrl);

router.get("/api/urls",authMiddleware, getAllUrl);

router.get("/api/urls/:shortCode", authMiddleware, getUrlByCode);

router.delete("/api/urls/:shortCode", authMiddleware, deleteUrl);

router.put("/api/urls/:shortCode", authMiddleware, updateUrl);


export default router;
