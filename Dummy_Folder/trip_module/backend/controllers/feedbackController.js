import { getConnection } from "../configs/DbConfig.js";

export async function submitFeedback(req, res) {
    const { user_id, message } = req.body;
    try {
        const connection = await getConnection();
        await connection.query(`INSERT INTO feedback (user_id, message) VALUES (?, ?)`, [user_id, message]);
        res.status(201).json({ message: "Feedback submitted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function viewAllFeedback(req, res) {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(
            `SELECT f.*, u.name FROM feedback f JOIN users u ON f.user_id=u.id`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
