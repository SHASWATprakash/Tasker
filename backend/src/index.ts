// backend/src/index.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./db";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let db: any;

// Initialize DB before starting server
initDB().then((database) => {
  db = database;
  console.log("SQLite DB connected ✅");
});

// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (user) {
      return res.json({ token: "mock-jwt-token", user: { username: user.username } });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Example secure route
app.get("/api/todos", (req, res) => {
  return res.json([
    { id: 1, title: "Learn SQLite", done: false },
    { id: 2, title: "Integrate backend", done: true },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
