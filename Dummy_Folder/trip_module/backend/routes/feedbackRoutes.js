import express from "express";
import { submitFeedback, viewAllFeedback } from "../controllers/feedbackController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRole("user"), submitFeedback);
router.get("/", verifyToken, authorizeRole("admin"), viewAllFeedback);

export default router;
