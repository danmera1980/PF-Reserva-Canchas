/**
 * /* eslint-disable no-unreachable
 *
 * @format
 */

import axios from 'axios';
import { ALL_USERS, REGISTER, LOGIN, LOGINGOOGLE, EDIT_SUCCESS, SET_ERRORS } from './actionNames';
const serverUrl = 'localhost';

export const getAllUsers = () => {
  return async dispatch => {
    try {
      var results = await axios.get(`http://${serverUrl}:3001/users`);
      return dispatch({
        type: ALL_USERS,
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({type: SET_ERRORS, payload: error})
    }
  };
};

export function registerUser(payload) {
  return function (dispatch) {
    axios
      .post(`http://${serverUrl}:3001/users/register`, payload)
      .then(data => {
        return dispatch({ type: REGISTER, payload: data.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({type: SET_ERRORS, payload: err})
      });
  };
}
export function loginUser(payload) {
  return function (dispatch) {
    axios
      .post(`http://${serverUrl}:3001/users/login`, payload)
      .then(user => {
        return dispatch({ type: LOGIN, payload: user.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({type: SET_ERRORS, payload: err})
      });
  };
}

export function loginWithGoogle(payload) {
  return function (dispatch) {
   
        return dispatch({ type: LOGINGOOGLE, payload: payload });
      }
      
}

export function editUser(payload, userToken) {
  const headers = {  
     'Authorization': `Bearer ${userToken}`
   }
   
  return  async function (dispatch){
    try {
      const response = await axios.put(
        `http://${serverUrl}:3001/users/login`,
         payload,
         {headers:headers}
         )
      return dispatch({type: EDIT_SUCCESS, payload: response.data})        
    } catch (error) {
        return dispatch({type: SET_ERRORS, payload: error})
    }
   }
}
