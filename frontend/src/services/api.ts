// src/services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** ---- Local backend (keep for login & protected routes) ---- **/
const LOCAL = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

LOCAL.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = async (username: string, password: string) => {
  const res = await LOCAL.post("/login", { username, password });
  return res.data; // { token }
};

/** ---- Public API for todos analytics ---- **/
export const fetchTodos = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return res.data as Array<{ userId: number; id: number; title: string; completed: boolean }>;
};

export const getTodoAnalytics = async () => {
  const todos = await fetchTodos();

  // Completed vs Pending
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  // Todos per user
  const perUser: Record<number, number> = {};
  todos.forEach((t) => {
    perUser[t.userId] = (perUser[t.userId] || 0) + 1;
  });

  return {
    pieData: [
      { name: "Completed", value: completed },
      { name: "Pending", value: pending },
    ],
    barData: Object.entries(perUser).map(([userId, count]) => ({
      userId: `U${userId}`,
      tasks: count as number,
    })),
    total: todos.length,
  };
};
