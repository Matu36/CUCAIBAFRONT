import axios from "axios";
// import { AgentesAPI } from "../../api/AgentesAPI";

export const GET_AGENTES = "GET_AGENTES";
export const GET_OPERATIVOS = "GET_OPERATIVOS";
export const POST_OPERATIVO = "POST_OPERATIVO";

export const getAgentes = () => async (dispatch) => {
  let response = await axios.get("http://localhost/cucaibabonif/trunk/public/index.php/api/agentes", {
    'mode': 'cors',
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'allow_methods':  'GET',
    }});
    return dispatch({ type: GET_AGENTES, payload: response.data });
  };

export const getOperativos = () => async (dispatch) => {
  let response = await axios.get("http://localhost/cucaibabonif/trunk/public/index.php/api/operativos", {
    'mode': 'cors',
    'headers': {
        'Access-Control-Allow-Origin': '*',
        'allow_methods':  'GET',
  }});

  console.log(response.data)

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
