import axios from "axios";

export const HonorariosAPI = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/honorarios`,
    withCredentials: true,
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'allow_methods': ["GET", "POST", "DELETE", "PUT"],
        "Access-Control-Allow-Credentials": true
    },
    transformRequest: [(data) => {
        return {usu_modi: "Juan", ...data};
      }, ...axios.defaults.transformRequest],
})
