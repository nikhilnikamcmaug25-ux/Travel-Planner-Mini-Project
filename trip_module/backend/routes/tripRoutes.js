import express from "express";
import { addTrip, deleteTrip, updateTrip, viewTrips } from "../controllers/tripcontroller.js";

const router = express.Router();

router.post("/add", addTrip);
router.get("/view/:user_id", viewTrips);
router.put("/update/:trip_id", updateTrip);
router.delete("/delete/:trip_id",deleteTrip);

export default router;