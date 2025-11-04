import express from "express";
import { submitContact, viewContacts } from "../controllers/contactController.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();

router.post("/", submitContact); // Public route (any user can send message)
router.get("/", verifyToken, authorizeRole("admin"), viewContacts); // Admin only

export default router;
