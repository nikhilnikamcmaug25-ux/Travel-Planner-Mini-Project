import { getConnection } from "../configs/DbConfig.js";

export async function addTrip(req, res) {
    const { user_id, destination, start_date, end_date } = req.body;
    try {
        const connection = await getConnection();
        await connection.query(
            `INSERT INTO trips (user_id, destination, start_date, end_date) VALUES (?, ?, ?, ?)`,
            [user_id, destination, start_date, end_date]
        );
        res.status(201).json({ message: "Trip added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getTrips(req, res) {
    try {
        const connection = await getConnection();
        const [trips] = await connection.query(`SELECT * FROM trips WHERE user_id=?`, [req.params.user_id]);
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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

export async function deleteTrip(req, res) {
    try {
        const connection = await getConnection();
        await connection.query(`DELETE FROM trips WHERE trip_id=?`, [req.params.trip_id]);
        res.json({ message: "Trip deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
