import express from "express";
import {
  addItinerary,
  getItineraries,
  deleteItinerary,
  getAllItineraries,  // ✅ add this import
} from "../controllers/ItineraryController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

//  Add itinerary (user)
router.post("/", verifyToken, authorizeRole("user"), addItinerary);

//  Get all itineraries (admin only)
router.get("/", verifyToken, authorizeRole("admin"), getAllItineraries); // ✅ this was missing

//  Get itineraries for a specific trip (user/admin)
router.get("/:trip_id", verifyToken, authorizeRole("user", "admin"), getItineraries);

//  Delete itinerary item (user)
router.delete("/:id", verifyToken, authorizeRole("user"), deleteItinerary);

export default router;
