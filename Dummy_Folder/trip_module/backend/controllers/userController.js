
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection } from "../configs/DbConfig.js";

// ===================== REGISTER =====================
export async function registerUser(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const connection = await getConnection();
    const [checkUser] = await connection.query(`SELECT * FROM users WHERE email=?`, [email]);
    if (checkUser.length > 0)
      return res.status(400).json({ message: "User already exists" });

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


// ===================== LOGIN =====================
export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const connection = await getConnection();
    const [user] = await connection.query(`SELECT * FROM users WHERE email=?`, [email]);
    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      "SECRET_KEY",
      { expiresIn: "2h" }
    );

    // ✅ Include role & user_id for frontend
    res.json({
      message: "Login successful",
      token,
      role: user[0].role,
      user_id: user[0].id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ===================== ADMIN: GET ALL USERS =====================
export async function getAllUsers(req, res) {
  try {
    const connection = await getConnection();
    const [users] = await connection.query(
      "SELECT id, name, email, role FROM users"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ===================== ADMIN: DELETE USER =====================
export async function deleteUser(req, res) {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
