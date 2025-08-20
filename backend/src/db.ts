// backend/src/db.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Create and open the database connection
export async function initDB() {
  const db = await open({
    filename: "./tasker.db",
    driver: sqlite3.Database,
  });

  // Create users table if it doesn’t exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Insert a default test user if not exists
  await db.run(
    `INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`,
    ["admin", "password123"]
  );

  return db;
}
