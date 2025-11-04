import { getConnection } from "../configs/DbConfig.js";

export async function addItinerary(req, res) {
    const { trip_id, activity, date, time } = req.body;
    try {
        const connection = await getConnection();
        await connection.query(
            `INSERT INTO itinerary (trip_id, activity, date, time) VALUES (?, ?, ?, ?)`,
            [trip_id, activity, date, time]
        );
        res.status(201).json({ message: "Itinerary item added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
