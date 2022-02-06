/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, LOGOUT } from "../actions/actionNames";

const initialState = {
  signUpResponse: undefined,
  userToken: null,
  userId: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      console.log(action.payload);
      return {
        ...state,
        signUpResponse: action.payload,
      };
    case LOGIN:
      console.log(action.payload)
      return {
        ...state,
        userToken: action.payload.token,
        userId: action.payload.id,
      };
    case LOGINGOOGLE:
      console.log(action.payload[1])
      return {
        ...state,
        userToken: action.payload[1], 
        userId: action.payload[0].id,
      };
    case EDIT_SUCCESS:
      console.log(state)
      console.log(action.payload);
      return {
        ...state,
        userToken: null,
        userId: null,
      
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
