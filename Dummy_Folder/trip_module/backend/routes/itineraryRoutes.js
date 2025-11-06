// backend/routes/ItineraryRoutes.js
import express from "express";
import {
  addItinerary,
  getItineraries,
  deleteItinerary,
} from "../controllers/ItineraryController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

// ✅ Add itinerary (user)
router.post("/", verifyToken, authorizeRole("user"), addItinerary);

// ✅ Get itineraries for a specific trip (user)
router.get("/:trip_id", verifyToken, authorizeRole("user", "admin"), getItineraries);

// ✅ Delete itinerary item (user)
router.delete("/:id", verifyToken, authorizeRole("user"), deleteItinerary);

export default router;
