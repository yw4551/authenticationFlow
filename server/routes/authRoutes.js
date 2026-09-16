import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, getAllUsers);

export default router;
