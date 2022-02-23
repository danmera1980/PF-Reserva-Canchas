/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, LOGOUT, SET_ERRORS } from "../actions/actionNames";

const initialState = {
  userToken: null,
  userId: null,
  isActive: null,
  userMessage:[] // mensaje de respuesta
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
      };
    case LOGIN:
      console.log(action.payload)
      return {
        ...state,
        userToken: action.payload.token,
        userId: action.payload.id,
        isActive: action.payload.isActive,

      };
    case LOGINGOOGLE:
      console.log(action.payload, 'estoy en logingoolge')
      return {
        ...state,
        userToken: action.payload[1], 
        userId: action.payload[0].id,
        isActive: action.payload[0].isActive,

      };
      case EDIT_SUCCESS:
        return {
            ...state,
            userMessage: action.payload,
        };
    case SET_ERRORS:
        return{
            ...state,
        };
    case LOGOUT:
      console.log('estoy en logout');
      return {
        ...state,
        userToken: null,
        userId: null,
        isActive: null,
        userMessage:[]
      };
    default:
      return state;
  }
};

export default registerReducer;
