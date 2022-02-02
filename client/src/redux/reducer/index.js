import { combineReducers } from "redux";
import userReducer from "./user";
import postEstablishmentReducer from "./createEstablishment";
import postSiteReducer from "./createSite";

const allReducers = combineReducers({
    users: userReducer,
    usersEstablishment: postEstablishmentReducer,
    usersSites: postSiteReducer,
});

export default allReducers;
 