/** @format */

import { combineReducers } from 'redux';
import userReducer from './user';
import registerReducer from './register';
import establishmentReducer from './establishment';

const allReducers = combineReducers({
  users: userReducer,
  register: registerReducer,
  establishment: establishmentReducer
});

export default allReducers;
