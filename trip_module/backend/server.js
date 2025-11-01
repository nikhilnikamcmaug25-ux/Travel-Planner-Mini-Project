import express from "express";
import { connectiondb } from "./configs/db.js";
import tripRoutes from "./routes/tripRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";


const app = express();
app.use(express.json());

// for tetsing the route
app.get("/", (req, res) => {
  res.send({ message: "Trip Module Server is Running ✅" });
});

// All OG's --> 

//for user operations
app.use("/api/trip", tripRoutes);
//for itinerary operations
app.use("/api/itinerary", itineraryRoutes)




// connect to database
connectiondb();
app.listen(5500, () => {
  console.log("🚀 Trip backend running on http://localhost:5500");
});
