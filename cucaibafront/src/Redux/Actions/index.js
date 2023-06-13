import axios from "axios";
import { AgentesAPI } from "../../api/AgentesAPI";

export const GET_AGENTES = "GET_AGENTES";
export const GET_OPERATIVOS = "GET_OPERATIVOS";
export const POST_OPERATIVO = "POST_OPERATIVO";

export const getAgentes = () => async (dispatch) => {
  let response = await AgentesAPI.get("/");
  return dispatch({ type: GET_AGENTES, payload: response.data });
};

export const getOperativos = () => async (dispatch) => {
  let response = await axios.get("http://localhost:8000/operativos");
  return dispatch({ type: GET_OPERATIVOS, payload: response.data });
};

export const postOperativo =
  ({ referencia, fecha, descripcion, fechapago }) =>
  (dispatch) =>
    axios
      .post(
        "http://localhost:8000/operativos/nuevo",
        {
          referencia,
          fecha,
          descripcion,
          fechapago,
        },
        
      )
      .then((payload) => dispatch({ type: POST_OPERATIVO, payload }));
