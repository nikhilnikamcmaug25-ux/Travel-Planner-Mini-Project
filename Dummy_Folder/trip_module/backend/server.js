import express from "express";
import cors from "cors";
import { connectiondb } from "./configs/DbConfig.js"; // ✅ Import this

import UserRoutes from "./routes/userRoutes.js";
import TripRoutes from "./routes/tripRoutes.js";
import ItineraryRoutes from "./routes/itineraryRoutes.js";
import FeedbackRoutes from "./routes/feedbackRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to database before starting the server
await connectiondb();

app.use("/api/users", UserRoutes);
app.use("/api/trips", TripRoutes);
app.use("/api/itinerary", ItineraryRoutes);
app.use("/api/feedback", FeedbackRoutes);
app.use("/api/contact", ContactRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
