import axios from "axios";

export const PersonasAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/personas`,
  withCredentials: true,
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    allow_methods: ["GET", "POST", "PUT"],
    "Access-Control-Allow-Credentials": true,
  },
});
