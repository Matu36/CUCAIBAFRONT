import { GET_AGENTES, GET_OPERATIVOS, POST_OPERATIVO } from "../Actions";

const InitialState = {
  agentes: [],

  operativos: [],
};

function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case GET_AGENTES:
      return { ...state, agentes: action.payload };
    case GET_OPERATIVOS:
      return { ...state, operativos: action.payload };
    case POST_OPERATIVO:
      return { ...state, operativos: [...state.operativos, action.payload] };
    default:
      return state;
  }
}

export default rootReducer;
