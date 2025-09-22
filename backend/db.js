import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      item_name VARCHAR(255),
      price DECIMAL(10,2),
      quantity INT,
      date DATE
    )
  `);

  return connection;
}
