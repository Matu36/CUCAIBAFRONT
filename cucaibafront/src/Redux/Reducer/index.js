import { GET_AGENTES, GET_OPERATIVOS } from "../Actions";

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
    default:
      return state;
  }
}

export default rootReducer;
