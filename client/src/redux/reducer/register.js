/** @format */

import { REGISTER, LOGIN, LOGINGOOGLE } from '../actions/actionNames';

const initialState = {
  signUpData: undefined,
  userToken: undefined,
  userId: undefined,
  userEmail: undefined,
  userName: undefined,
  userImage: undefined,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        signUpData: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        userToken: action.payload.token,
        userId: action.payload.id,
        userEmail: action.payload.email,
        userName: action.payload.name,
        userImage: action.payload.image,
      };
    case LOGINGOOGLE:
      return {
        ...state,
        signUpData: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
