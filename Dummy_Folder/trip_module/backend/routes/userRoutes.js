// backend/routes/UserRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only routes
router.get("/", verifyToken, authorizeRole("admin"), getAllUsers);
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteUser);

export default router;
