import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "supersecretkey";

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "eve.holt@reqres.in" && password === "cityslicka") {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

// Protected Todos API
app.get('/todos', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
    res.json(todos.data);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
