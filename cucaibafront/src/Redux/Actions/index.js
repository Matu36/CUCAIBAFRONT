import axios from "axios";
import { AgentesAPI } from "../../api/AgentesAPI";
import { OperativosAPI } from "../../api/OperativosAPI";
import { ModulosAPI } from "../../api/ModulosAPI";
import { CategoriasAPI } from "../../api/CategoriasAPI.js";
import { TipoAPI } from "../../api/TipoAPI";
import { PersonasAPI } from "../../api/PersonasAPI";
import { HonorariosAPI } from "../../api/HonorariosAPI";

export const GET_AGENTES = "GET_AGENTES";
export const GET_OPERATIVOS = "GET_OPERATIVOS";
export const POST_OPERATIVO = "POST_OPERATIVO";
export const POST_AGENTES = "POST_AGENTES";
export const GET_MODULOS = "GET_MODULOS";
export const GET_CATEGORIAS = "GET_CATEGORIAS";
export const GET_TIPOMODULO = "GET_TIPOMODULO";
export const POST_MODULO = "POST_MODULO";
export const UPDATE_MODULO = "UPDATE_MODULO";
export const GET_PERSONAS = "GET_PERSONAS";
export const GET_HONORARIO = "GET_HONORARIO";
export const POST_HONORARIO = "POST_HONORARIO";

export const getAgentes = () => async (dispatch) => {
  let response = await AgentesAPI.get("");

  return dispatch({ type: GET_AGENTES, payload: response.data });
};

export const getPersonas = () => async (dispatch) => {
  let response = await PersonasAPI.get("");

  return dispatch({ type: GET_PERSONAS, payload: response.data });
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
    OperativosAPI.post("", {
      referencia,
      fecha,
      descripcion,
      fechapago,
    }).then((payload) => dispatch({ type: POST_OPERATIVO, payload }));

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
  ({ tipo, categoria, valor, descripcion, fechaDesde }) =>
  (dispatch) =>
    ModulosAPI.post("", {
      tipo,
      categoria,
      valor,
      descripcion,
      fechaDesde,
    }).then((payload) => dispatch({ type: POST_MODULO, payload }));

export const updateModulo = (modulo) => {
  return (dispatch) => {
    ModulosAPI.put(`/${modulo.id}/update-value`, { ...modulo })
      .then((res) => {
        dispatch({
          type: UPDATE_MODULO,
          payload: { ...modulo },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getHonorario = () => async (dispatch) => {
  let response = await HonorariosAPI.get("/props");

  return dispatch({ type: GET_HONORARIO, payload: response.data });
};

export const getHonorarioByAgente = (agenteId) => async (dispatch) => {
  let response = await HonorariosAPI.get(`/${agenteId}`);

  return dispatch({ type: GET_HONORARIO, payload: response.data });
};

export const postHonorario =
  ({
    operativo_id,
    agente_id,
    modulo_id,
    fechaModif,
    liquidacion_id,
    opprovisorio_nro,
  }) =>
  (dispatch) =>
    HonorariosAPI.post("", {
      operativo_id,
      agente_id,
      modulo_id,
      fechaModif,
      liquidacion_id,
      opprovisorio_nro,
    }).then((payload) => dispatch({ type: POST_HONORARIO, payload }));
