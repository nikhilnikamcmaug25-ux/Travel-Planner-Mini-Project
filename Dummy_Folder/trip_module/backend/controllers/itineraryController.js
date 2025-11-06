// backend/controllers/ItineraryController.js
import { getConnection } from "../configs/DbConfig.js";

// ✅ Add new itinerary item
export async function addItinerary(req, res) {
  const { trip_id, activity, date, time } = req.body;
  try {
    const connection = await getConnection();

    const [tripRows] = await connection.query(
      "SELECT trip_id FROM trips WHERE trip_id = ?",
      [trip_id]
    );
    if (tripRows.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid trip_id — trip does not exist." });
    }

    await connection.query(
      `INSERT INTO itinerary (trip_id, activity, date, time) VALUES (?, ?, ?, ?)`,
      [trip_id, activity, date, time]
    );

    res.status(201).json({ message: "Itinerary item added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get itineraries for a trip
export async function getItineraries(req, res) {
  const { trip_id } = req.params;
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT * FROM itinerary WHERE trip_id = ? ORDER BY date, time`,
      [trip_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get all itineraries (for admin)
export async function getAllItineraries(req, res) {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query(
      `SELECT i.*, t.destination, u.name AS user_name, u.email AS user_email
       FROM itinerary i
       JOIN trips t ON i.trip_id = t.trip_id
       JOIN users u ON t.user_id = u.id
       ORDER BY i.date, i.time`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Delete an itinerary item
export async function deleteItinerary(req, res) {
  const { id } = req.params;
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      `DELETE FROM itinerary WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Itinerary item not found" });
    }

    res.json({ message: "Itinerary item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
