import axios from "axios";

export const OperativosAPI = axios.create({
    baseURL: "http://localhost:80/cucaibabonif/trunk/public/index.php/api/operativos",
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST"],
        "Access-Control-Allow-Credentials": true
    }
})