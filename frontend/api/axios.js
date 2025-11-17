import axios from "axios";

const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL: isServer ? "http://backend:3006" : "http://localhost:3006",
  withCredentials: true,
});

export default api;