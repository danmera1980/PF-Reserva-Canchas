import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import allReducers from '../reducer/index';
import thunk from "redux-thunk";


const store = createStore(
    allReducers, 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;