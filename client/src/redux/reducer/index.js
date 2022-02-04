/** @format */

import { combineReducers } from 'redux';
import userReducer from './user';
import registerReducer from './register';
import formsReducer from './forms';
import establishmentReducer from './establishment';

const allReducers = combineReducers({
  users: userReducer,
  register: registerReducer,
  login: registerReducer,
  forms: formsReducer,
  establishment: establishmentReducer
});

export default allReducers;
