import mysql from "mysql2/promise";

export let connection;

export async function connectiondb() {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "cdac",
      database: "travel_planner",
      port: 3306,
    });
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.log("❌ Database connection failed");
    console.log(error);
  }
}
