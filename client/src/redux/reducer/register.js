/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, LOGOUT, SET_ERRORS } from "../actions/actionNames";

const initialState = {
  userToken: null,
  userId: null,
  registerErrors:[], // se cargan los errores de login, register y edit user
  userMessage:[] // mensaje de respuesta
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
      };
    case LOGIN:
      return {
        ...state,
        userToken: action.payload.token,
        userId: action.payload.id,
        registerErrors:[]
      };
    case LOGINGOOGLE:
      return {
        ...state,
        userToken: action.payload[1], 
        userId: action.payload[0].id,
        registerErrors:[]
      };
      case EDIT_SUCCESS:
        return {
            ...state,
            userMessage: action.payload,
            registerErrors:[]
        };
    case SET_ERRORS:
        return{
            ...state,
            registerErrors: action.payload
        };
    case LOGOUT:
      console.log('estoy en logout');
      return {
        ...state,
        userToken: null,
        userId: null,
        userMessage:[]
      };
    default:
      return state;
  }
};

export default registerReducer;
