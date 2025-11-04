import express from "express";
import { addTrip, getTrips, updateTrip, deleteTrip } from "../controllers/TripController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRole } from "../middlewares/AuthorizeRole.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRole("user"), addTrip);
router.get("/:user_id", verifyToken, authorizeRole("user", "admin"), getTrips);
router.put("/:trip_id", verifyToken, authorizeRole("user"), updateTrip);
router.delete("/:trip_id", verifyToken, authorizeRole("user"), deleteTrip);

export default router;
