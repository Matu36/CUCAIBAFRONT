import axios from "axios";

export const AgentesAPI = axios.create({
    baseURL: "http://localhost:8080/cucaibabonif/public/index.php/api/agentes",
    withCredentials: false,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})