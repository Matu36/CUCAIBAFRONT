import axios from "axios";

export const HonorariosAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/honorarios`,
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})
