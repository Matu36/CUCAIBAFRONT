import axios from "axios";

export const AgentesAPI = axios.create({
    baseURL: `${process.env.API_URL}/agentes`,
    withCredentials: false,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})
