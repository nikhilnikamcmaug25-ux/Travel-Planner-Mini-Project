// backend/controllers/TripController.js
import { getConnection } from "../configs/DbConfig.js";

export async function addTrip(req, res) {
  const { user_id, trip_name, destination, start_date, end_date, budget, description } = req.body;

  if (!trip_name || !destination) {
    return res.status(400).json({ error: "Trip name and destination are required." });
  }

  try {
    const connection = await getConnection();
    await connection.query(
      `INSERT INTO trips (user_id, trip_name, destination, start_date, end_date, budget, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, trip_name, destination, start_date, end_date, budget || 0, description || null]
    );

    res.status(201).json({ message: "Trip added successfully" });
  } catch (err) {
    console.error("Error adding trip:", err);
    res.status(500).json({ error: err.message });
  }
}


// ✅ Get trips for a specific user
export async function getTrips(req, res) {
  try {
    const connection = await getConnection();
    const [trips] = await connection.query(
      `SELECT * FROM trips WHERE user_id = ?`,
      [req.params.user_id]
    );
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Get all trips (for admin)
export async function getAllTrips(req, res) {
  try {
    const connection = await getConnection();
    const [trips] = await connection.query(
      `SELECT t.*, u.name AS user_name, u.email AS user_email
       FROM trips t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.start_date DESC`
    );
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Update trip
export async function updateTrip(req, res) {
  const { trip_id } = req.params;
  const { destination, start_date, end_date } = req.body;
  try {
    const connection = await getConnection();
    await connection.query(
      `UPDATE trips SET destination=?, start_date=?, end_date=? WHERE trip_id=?`,
      [destination, start_date, end_date, trip_id]
    );
    res.json({ message: "Trip updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ✅ Delete trip
export async function deleteTrip(req, res) {
  try {
    const connection = await getConnection();
    await connection.query(`DELETE FROM trips WHERE trip_id=?`, [
      req.params.trip_id,
    ]);
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
