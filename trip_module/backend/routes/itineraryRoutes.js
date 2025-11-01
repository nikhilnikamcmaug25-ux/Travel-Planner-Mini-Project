import express from "express";
import { addItinerary, deleteItinerary, getItineraryByTrip, updateItinerary } from "../controllers/itineraryController.js";

const router = express.Router();

router.post("/add", addItinerary);
router.get("/view/:trip_id",getItineraryByTrip);
router.put("/update/:itineraryid",updateItinerary);
router.delete("/delete/:itineraryid",deleteItinerary);

export default router;