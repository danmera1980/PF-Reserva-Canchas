import { combineReducers } from "redux";
import userReducer from "./user";
import postEstablishmentReducer from "./createEstablishment";
import postSiteReducer from "./createSite";
import registerReducer from './register';
import establishmentReducer from './establishment'

const allReducers = combineReducers({
    users: userReducer,
    usersEstablishment: postEstablishmentReducer,
    usersSites: postSiteReducer,
    register: registerReducer,
    login: registerReducer,
    establishment: establishmentReducer,
});

export default allReducers;