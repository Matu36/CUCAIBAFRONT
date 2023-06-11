import { GET_AGENTES } from "../Actions";

const InitialState = {
  agentes: [],
};

function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case GET_AGENTES:
      return { ...state, agentes: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
