import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection } from "../configs/DbConfig.js";

export async function registerUser(req, res) {
    const { name, email, password, role } = req.body;
    try {
        const connection = await getConnection();
        const [checkUser] = await connection.query(`SELECT * FROM users WHERE email=?`, [email]);
        if (checkUser.length > 0) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        await connection.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashed, role || "user"]
        );
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const connection = await getConnection();
        const [user] = await connection.query(`SELECT * FROM users WHERE email=?`, [email]);
        if (user.length === 0) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user[0].password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, "SECRET_KEY", { expiresIn: "2h" });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
