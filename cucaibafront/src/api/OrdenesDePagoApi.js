import axios from "axios";

export const OrdenesDePagoAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/ordenesdepago`,
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET"],
        "Access-Control-Allow-Credentials": true
    }
})