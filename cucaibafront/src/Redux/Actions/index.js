import axios from "axios";
import { AgentesAPI } from "../../api/AgentesAPI";
import { OperativosAPI } from "../../api/OperativosAPI";
import { ModulosAPI } from "../../api/ModulosAPI";

export const GET_AGENTES = "GET_AGENTES";
export const GET_OPERATIVOS = "GET_OPERATIVOS";
export const POST_OPERATIVO = "POST_OPERATIVO";
export const POST_AGENTES = "POST_AGENTES";
export const GET_MODULOS = "GET_MODULOS";

export const getAgentes = () => async (dispatch) => {
  let response = await AgentesAPI.get("");

  return dispatch({ type: GET_AGENTES, payload: response.data });
};

export const getOperativos = () => async (dispatch) => {
  let response = await OperativosAPI.get("");

  return dispatch({ type: GET_OPERATIVOS, payload: response.data });
};

export const getModulos = () => async (dispatch) => {
  let response = await ModulosAPI.get();
  return dispatch({ type: GET_MODULOS, payload: response.data });
};

export const postOperativo =
  ({ referencia, fecha, descripcion, fechapago }) =>
  (dispatch) =>
    axios
      .post(
        "http://localhost/cucaibabonif/trunk/public/index.php/api/operativos",
        {
          referencia,
          fecha,
          descripcion,
          fechapago,
        },
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            allow_methods: "POST",
          },
        }
      )
      .then((payload) => dispatch({ type: POST_OPERATIVO, payload }));

export const postAgentes =
  ({ apellido, nombre, cbu, cuil, tipoPago, personaid }) =>
  (dispatch) =>
    AgentesAPI.post("", {
      apellido,
      nombre,
      cbu,
      cuil,
      tipoPago,
      personaid,
    }).then((payload) => dispatch({ type: POST_AGENTES, payload }));
