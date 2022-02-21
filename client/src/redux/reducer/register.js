/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, LOGOUT, SET_ERRORS } from "../actions/actionNames";

const initialState = {
  userToken: null,
  userId: null,
  isAdmin: null,
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
        isAdmin: action.payload.isAdmin,

        registerErrors:[]
      };
    case LOGINGOOGLE:
      console.log(action.payload, 'estoy en logingoolge')
      return {
        ...state,
        userToken: action.payload[1], 
        userId: action.payload[0].id,
        isAdmin: action.payload[0].isAdmin,

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
