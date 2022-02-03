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
  const headers = {
    'Authorization': 'Bearer ${token}...'

  }
  return function (dispatch) {
    axios
      .post(`http://${serverUrl}:3001/users/register`, payload, {headers: headers})
      .then(data => {
        return dispatch({ type: REGISTER, payload: data.data });
      })
      .catch(err => {
        console.log(err);
                //aca accion que avisa error en registro

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
        //aca accion que avisa error en login
      });
  };
}

export function loginWithGoogle(payload) {
  return function (dispatch) {
   //get user mandando el token en middleware me crea o encuentra el usuario y zas devuelve la info 
        return dispatch({ type: LOGINGOOGLE, payload: payload });
      }
      
}


export function userUpdate(){

}