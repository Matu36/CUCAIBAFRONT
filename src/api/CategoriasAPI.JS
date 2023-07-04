import axios from "axios";

export const CategoriasAPI = axios.create({
    baseURL: `${process.env.API_URL}/categorias`,
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})