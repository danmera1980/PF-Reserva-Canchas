/**
 * /* eslint-disable no-unreachable
 *
 * @format
 */

import axios from 'axios';
import { ALL_USERS, REGISTER, LOGIN, LOGINGOOGLE } from './actionNames';
const serverUrl = 'localhost';

export const getAllUsers = () => {
  return async dispatch => {
    var results = await axios.get(`http://${serverUrl}:3001/users`);
    return dispatch({
      type: ALL_USERS,
      payload: results.data,
    });
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
      });
  };
}

export function loginWithGoogle(payload) {
  return function (dispatch) {
   
        return dispatch({ type: LOGINGOOGLE, payload: payload });
      }
      
}
