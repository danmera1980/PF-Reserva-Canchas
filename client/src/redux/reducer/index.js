/** @format */

import { combineReducers } from 'redux';
import userReducer from './user';
import postEstablishmentReducer from './createEstablishment';
import registerReducer from './register';

const allReducers = combineReducers({
  users: userReducer,
  usersEstablishment: postEstablishmentReducer,
  register: registerReducer,
  login: registerReducer,
});

export default allReducers;
