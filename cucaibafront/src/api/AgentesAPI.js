import axios from "axios";

export const AgentesAPI = axios.create({
    baseURL: "http://localhost:80/trunk/public/index.php/agentes"
})