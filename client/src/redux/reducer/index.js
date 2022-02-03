/** @format */

import { combineReducers } from 'redux';
import userReducer from './user';
import registerReducer from './register';
import formsReducer from './forms';

const allReducers = combineReducers({
  users: userReducer,
  register: registerReducer,
  login: registerReducer,
  forms: formsReducer
});

export default allReducers;
