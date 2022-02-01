import { combineReducers } from "redux";
import userReducer from "./user";
import postEstablishmentReducer from "./createEstablishment";

const allReducers = combineReducers({
    users: userReducer,
    usersEstablishment: postEstablishmentReducer,
});

export default allReducers;
 