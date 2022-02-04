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
      var results = await axios.get(`https://${serverUrl}:3001/users`);
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

export function loginWithGoogle(response) {
  const headers = {  
    'Authorization': `Bearer ${response.tokenId}`
  }
  return function (dispatch) {
    axios.post(`http://${serverUrl}:3001/users/googleRegister`,{},
    {headers:headers})
    .then(user => {
      return dispatch({ type: LOGINGOOGLE, payload: [user.data, response.tokenId] });
    })
    .catch(err => {
      console.log(err);
    });      
  }
    
}

export function editUser(payload, userToken) {
  const headers = {  
     'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0NTBhMzVhMjA4MWZhYTFkOWFlMWQyZDc1YTBmMjNkOTFkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzI1MTE5OTcxNDI3LXFxMHVkZms0OWhrcHQwcXJiYmhmaWE5YmJvNnZqczh1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzI1MTE5OTcxNDI3LXFxMHVkZms0OWhrcHQwcXJiYmhmaWE5YmJvNnZqczh1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4NzAxNzE1MjEzNzk4NDA2MzY3IiwiZW1haWwiOiJqZ2FsdmFuODlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJzWVEtOUVIaUFVdXNuSElKdHc3WTh3IiwibmFtZSI6IkVpbWkgR2FsdmFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpemotWV91WjByUC1LbnZyaVZWR3BfY09UeHJzV3Q0cFdTMXFTOHFTMD1zOTYtYyIsImdpdmVuX25hbWUiOiJFaW1pIiwiZmFtaWx5X25hbWUiOiJHYWx2YW4iLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY0MzkzNDgxOSwiZXhwIjoxNjQzOTM4NDE5LCJqdGkiOiI5OTNjZWEwZjgxYmQyM2Q3NWNjMmMwNmEzMDg1ZDQ0OGMyZWU2MGQzIn0.EtdNNBkKoZEJlNskso_Y6Qwv2jbOW3rpkVlVLaD-D0B9rffOJQdhXimpoo5MYZ1JahGeopzb3DdbmVspM3q9dO4BWTWFxO2WRDnO9M-Nk4ZUMhUjqJJ3mN9AC6ua0bE_qLgleJG_m62fknkqu4Ss3AckdhsNWRDvDMw4hAnb2N6Ipy-EgtJQg6UGpctxDtuopmHotvwi5FqgseoROxyOpZtP346AVnDP4QkSuGLzkvoVcTIAAhzaO0kwzXwiooYtqH35sxTaTc49PwT1RtSjsrR0XcfVaAa02RWGzXVLHHRI5eCI8Npko1NLV2TrnuATJj5XKzOU2GlwL4xCF5bG5A`
   }
   
  return  async function (dispatch){
    try {
      const response = await axios.put(
        `http://${serverUrl}:3001/users/edit`,
         payload,
         {headers:headers}
         )
      return dispatch({type: EDIT_SUCCESS, payload: response.data})        
    } catch (error) {
        return dispatch({type: SET_ERRORS, payload: error})
    }
   }
}
