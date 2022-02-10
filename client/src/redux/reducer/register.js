/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, LOGOUT, SET_ERRORS } from "../actions/actionNames";

const initialState = {
  userToken: null,
  userId: null,
  userErrors:[], // se cargan los errores de login, register y edit user
  userMessage:[] // mensaje de respuesta
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      console.log(action.payload);
      return {
        ...state,
      };
    case LOGIN:
      console.log(action.payload)
      return {
        ...state,
        userToken: action.payload.token,
        userId: action.payload.id,
      };
    case LOGINGOOGLE:
      return {
        ...state,
        userToken: action.payload[1], 
        userId: action.payload[0].id,
      };
      case EDIT_SUCCESS:
        return {
            ...state,
            userMessage: action.payload
        };
    case SET_ERRORS:
        return{
            ...state,
            userErrors: action.payload
        };
    case LOGOUT:
      console.log('estoy en logout');
      return {
        ...state,
        userToken: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default registerReducer;
