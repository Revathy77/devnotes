import axios from "axios";

// Codespaces can't use localhost in the browser, so build the forwarded backend URL
const getDefaultApiUrl = () => {
  const { hostname, protocol } = window.location;
  if (hostname.endsWith(".app.github.dev")) {
    return `${protocol}//${hostname.replace(/-5173\./, "-5000.")}/api`;
  }
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || getDefaultApiUrl(),
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getErrorMessage = (err) =>
  err.response?.data?.message || "Cannot reach the server. Check that the backend is running and the API URL is correct.";

export default api;
