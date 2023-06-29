import axios from "axios";

export const OperativosAPI = axios.create({
    baseURL: "http://localhost:8080/cucaibabonif/public/index.php/api/operativos",
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})