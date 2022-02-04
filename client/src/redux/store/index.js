import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "../reducer/index";
import thunk from "redux-thunk";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = createStore(
  allReducers,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
