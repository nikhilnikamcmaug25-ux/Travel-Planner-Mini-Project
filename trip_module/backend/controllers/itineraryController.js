import { json } from "express";
import { connection } from "../configs/db.js";

export async function addItinerary(req, res) {
    try {
        const { trip_id, day_number, activity, location, time, notes } = req.body;

        //validation
        if (!trip_id || !day_number || !activity) {
            return res.status(400).json({ message: "trip_id, day_number, and activity are required" });
        }

        const [result] = await connection.query(`INSERT INTO itinerary(trip_id, day_number, activity, location, time, notes)VALUES(?,?,?,?,?,?)`, [trip_id, day_number, activity, location, time, notes]);

        res.status(201).json({ message: "Itinerary add Successfully !", itineraryID: result.insertId, });

    } catch (error) {
        console.error("Error adding itinerary : ", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getItineraryByTrip(req, res) {
    try {
        const { trip_id } = req.params;

        const [rows] = await connection.query(
            "SELECT * FROM itinerary WHERE trip_id = ?ORDER BY day_number ASC", [trip_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No itinerary found for this trip" });
        }
        res.status(200).json(rows);

    } catch (error) {
        console.error("Error fetching itinerary:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function updateItinerary(req, res) {
    try {
        const itinerary_id = req.params.itineraryid;
        const { day_number, activity, location, time, notes } = req.body;

        const [existing] = await connection.query(
            "SELECT * FROM itinerary WHERE itinerary_id = ?",
            [itinerary_id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: "Itinerary not found!" });
        }

        const [result] = await connection.query(`UPDATE itinerary SET day_number = ?, activity = ?, location = ?, time = ?, notes = ?  WHERE itinerary_id = ?`,
            [day_number, activity, location, time, notes, itinerary_id]
        );

        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Itinerary updated successfully!" });
        } else {
            res.status(400).json({ message: "No changes made." });
        }

    } catch (error) {
        console.error("Error updating itinerary:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


export async function deleteItinerary(req, res) {
    try {
        const itinerary_id = req.params.itineraryid;

        const [result] = await connection.query("DELETE FROM itinerary WHERE itinerary_id = ?", [itinerary_id]);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Itinerary Delete Successfully !" });
        } else {
            res.status(404).json({ message: "Itinerary Not found ! " });
        }
    } catch (error) {
        console.error("Error deleting itinerary:", error);
        res.status(500).json({ message: "Server Error ", error: error.message });
    }
}