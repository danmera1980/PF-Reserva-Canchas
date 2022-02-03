import { combineReducers } from "redux";
import userReducer from "./user";
import postEstablishmentReducer from "./createEstablishment";
import postSiteReducer from "./createSite";
import registerReducer from './register';
import formsReducer from './forms';

const allReducers = combineReducers({
  users: userReducer,
  usersEstablishment: postEstablishmentReducer,
  register: registerReducer,
  login: registerReducer,
  forms: formsReducer
});

export default allReducers;