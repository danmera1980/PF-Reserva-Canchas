/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS } from "../actions/actionNames";

const initialState = {
  signUpResponse: undefined,
  userLogged: {
    userToken: undefined,
    userId: undefined,
    userEmail: undefined,
    userName: undefined,
    userImage: undefined,
  },
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
      localStorage.setItem('key', action.payload.token);
      return {
        ...state,
        userLogged: {
          userToken: action.payload.token,
          userId: action.payload.id,
          userEmail: action.payload.email,
          userName: action.payload.name,
        },
      };
    case LOGINGOOGLE:
      console.log( action.payload[0].name)
      return {
        ...state,
        userLogged: {
        sessionToken: action.payload[1], //aca tiene que guardar response.tokenId
        userName: action.payload[0].name,
        userEmail: action.payload[0].email,
        userId: action.payload[0].id,
        }
      };
      case EDIT_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          userName: action.payload.name,
          userEmail: action.payload.email,
          userId: action.payload.id,        };
    default:
      return state;
  }
};

export default registerReducer;
