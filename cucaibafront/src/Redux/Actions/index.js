import axios from "axios";
import { AgentesAPI } from "../../api/AgentesAPI";
import { OperativosAPI } from "../../api/OperativosAPI";
import { ModulosAPI } from "../../api/ModulosAPI";
import { CategoriasAPI } from "../../api/CategoriasAPI.js";
import { TipoAPI } from "../../api/TipoAPI";

export const GET_AGENTES = "GET_AGENTES";
export const GET_OPERATIVOS = "GET_OPERATIVOS";
export const POST_OPERATIVO = "POST_OPERATIVO";
export const POST_AGENTES = "POST_AGENTES";
export const GET_MODULOS = "GET_MODULOS";
export const GET_CATEGORIAS = "GET_CATEGORIAS";
export const GET_TIPOMODULO = "GET_TIPOMODULO";
export const POST_MODULO = "POST_MODULO";

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

export const getCategorias = () => async (dispatch) => {
  let response = await CategoriasAPI.get();
  return dispatch({ type: GET_CATEGORIAS, payload: response.data });
};

export const getTipoModulo = () => async (dispatch) => {
  let response = await TipoAPI.get();
  return dispatch({ type: GET_TIPOMODULO, payload: response.data });
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

export const postModulo =
  ({ tipo, categpria, valor, descripcion, fechaDesde }) =>
  (dispatch) =>
    axios
      .post(
        "http://localhost/cucaibabonif/trunk/public/index.php/api/modulos",
        {
          tipo,
          categpria,
          valor,
          descripcion,
          fechaDesde,
        },
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            allow_methods: "POST",
          },
        }
      )
      .then((payload) => dispatch({ type: POST_MODULO, payload }));
