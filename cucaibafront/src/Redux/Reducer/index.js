import {
  GET_AGENTES,
  GET_OPERATIVOS,
  POST_OPERATIVO,
  POST_AGENTES,
  GET_MODULOS,
  GET_CATEGORIAS,
  GET_TIPOMODULO,
  POST_MODULO,
} from "../Actions";

const InitialState = {
  agentes: [],

  operativos: [],

  modulos: [],

  categorias: [],

  TipoModulo: [],
};

function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case GET_AGENTES:
      return { ...state, agentes: action.payload };
    case GET_OPERATIVOS:
      return { ...state, operativos: action.payload };
    case POST_OPERATIVO:
      return { ...state, operativos: [...state.operativos, action.payload] };
    case POST_AGENTES:
      return { ...state, agentes: [...state.agentes, action.payload] };
    case GET_MODULOS:
      return { ...state, modulos: [state.modulos, action.payload] };
    case GET_CATEGORIAS:
      return { ...state, categorias: [state.categorias, action.payload] };
    case GET_TIPOMODULO:
      return { ...state, TipoModulo: [state.TipoModulo, action.payload] };
    case POST_MODULO:
      return { ...state, modulos: [...state.modulos, action.payload] };
    default:
      return state;
  }
}

export default rootReducer;
