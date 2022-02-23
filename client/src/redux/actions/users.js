/**
 * /* eslint-disable no-unreachable
 *
 * @format
 */

import axios from "axios";
import {
  ALL_USERS,
  REGISTER,
  LOGIN,
  LOGINGOOGLE,
  EDIT_SUCCESS,
  SET_ERRORS,
  LOGOUT,
  SERVER_URL,
  USER_DATA,
  USER_FAV,
} from "./actionNames";

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      var results = await axios.get(`${SERVER_URL}/users`);
      return dispatch({
        type: ALL_USERS,
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_ERRORS, payload: error });
    }
  };
};

export function registerUser(payload) {
  return function (dispatch) {
    axios
      .post(`${SERVER_URL}/users/register`, payload)
      .then((data) => {
        return dispatch({ type: REGISTER, payload: data.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err });
      });
  };
}
export function loginUser(payload) {
  return { type: LOGIN, payload: payload };

  //     })
  //     .catch((err) => {
  //       dispatch({ type: SET_ERRORS, payload: "Contraseña o email incorrecto" });
  //     });
  // };
}

export function loginWithGoogle(response) {
  const headers = {
    Authorization: `Bearer ${response.tokenId}`,
  };
  return function (dispatch) {
    axios
      .post(`${SERVER_URL}/users/googleRegister`, response, {
        headers: headers,
      })
      .then((user) => {
        return dispatch({
          type: LOGINGOOGLE,
          payload: [user.data, response.tokenId],
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_ERRORS, payload: err });
      });
  };
}

export function editUser(payload, userToken) {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  return async function (dispatch) {
    try {
      const response = await axios.put(`${SERVER_URL}/users/edit`, payload, {
        headers: headers,
      });
      return dispatch({ type: EDIT_SUCCESS, payload: "Se editó correctamente el usuario" });
    } catch (error) {
      return dispatch({ type: SET_ERRORS, payload: error });
    }
  };
}

export function logoutAction() {
  return { type: LOGOUT };
}

export function getUserData(tokenId) {
  const headers = {
    Authorization: `Bearer ${tokenId}`,
  };
  return async (dispatch) => {
    try {
      var user = await axios.get(`${SERVER_URL}/users/profile`, {
        headers: headers,
      });
      console.log(user)
      return dispatch({
        type: USER_DATA,
        payload: user.data
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err });
    }
  };
}

export function addfav(userToken, courtId){
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  return async () => {
    try {
      await axios.put(`${SERVER_URL}/users/fav`, {courtId} ,{
        headers: headers,
      });

    } catch (err) {
      console.log(err);
    }
  };
}

export function delfav(userToken, courtId){
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  return async () => {
    try {
      await axios.delete(`${SERVER_URL}/users/fav/${courtId}` ,{
        headers: headers,
      });

    } catch (err) {
      console.log(err);
    }
  };
}

export function getfavs(tokenId){
  const headers = {
    Authorization: `Bearer ${tokenId}`,
  };
  return async (dispatch) => {
    try {
      var user = await axios.get(`${SERVER_URL}/users/fav`, {
        headers: headers,
      });
      console.log(user)
      return dispatch({
        type: USER_FAV,
        payload: user.data.courts
      });
    } catch (err) {
      console.log(err);
    }
  };
}