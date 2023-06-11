import axios from "axios";

export const GET_AGENTES = "GET_AGENTES";

export const getAgentes = () => async (dispatch) => {
    let response = await axios.get(
      'http://localhost:8000/agentes'
    );
    return dispatch({ type: GET_AGENTES, payload: response.data });
  };