/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE } from "../actions/actionNames";

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
      console.log(action.payload);
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
      return {
        ...state,
        sessionToken: action.payload.Iw.tokenId,
        userName: action.payload.Iw.Ju.tf,
        userLastName: action.payload.Iw.Ju.wW,


      };
    default:
      return state;
  }
};

export default registerReducer;
