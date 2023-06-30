import axios from "axios";

export const AgentesAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/agentes`,
    withCredentials: false,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})