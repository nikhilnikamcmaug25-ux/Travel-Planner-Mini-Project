import express from "express";
import { addItinerary } from "../controllers/ItineraryController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRole("user"), addItinerary);

export default router;
