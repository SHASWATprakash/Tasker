import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend base url
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token automatically if stored
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const fetchTodos = async () => {
  const response = await API.get("/todos");
  return response.data;
};

export default API;
