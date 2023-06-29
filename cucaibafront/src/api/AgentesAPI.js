import axios from "axios";

export const AgentesAPI = axios.create({
    baseURL: "http://localhost:80/cucaibabonif/trunk/public/index.php/api/agentes",
    withCredentials: false,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})