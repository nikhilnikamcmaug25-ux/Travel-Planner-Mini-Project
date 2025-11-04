import { getConnection } from "../configs/DbConfig.js";

export async function submitContact(req, res) {
    const { name, email, subject, message } = req.body;
    try {
        const connection = await getConnection();
        await connection.query(
            `INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)`,
            [name, email, subject, message]
        );
        res.status(201).json({ message: "Contact message sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function viewContacts(req, res) {
    try {
        const connection = await getConnection();
        const [contacts] = await connection.query(`SELECT * FROM contact`);
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
