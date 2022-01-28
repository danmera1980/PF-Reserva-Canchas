import { combineReducers } from "redux";
import userReducer from "./user";

const allReducers = combineReducers({
    users: userReducer,
});

export default allReducers;
