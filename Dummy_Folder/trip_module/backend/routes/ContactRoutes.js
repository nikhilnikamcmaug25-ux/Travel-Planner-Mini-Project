import express from "express";
import { submitContact, viewContacts } from "../controllers/contactController.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Public route — for anyone to send a message
router.post("/", submitContact);

// Admin route — to view all messages
router.get("/", verifyToken, authorizeRole("admin"), viewContacts);

export default router;
