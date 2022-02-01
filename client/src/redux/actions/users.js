/* eslint-disable no-unreachable */

import axios from 'axios';
import { ALL_USERS } from './actionNames';
const serverUrl = 'localhost'

export const getAllUsers = () => {
    return async (dispatch) => {
        var results = await axios.get(`http://${serverUrl}:3001/users`);
        return dispatch({
            type: ALL_USERS,
            payload: results.data
        })
    }
}


export function postCourt(payload){

    try {
        return async function(dispatch){
            const response = await axios.post(`http://${serverUrl}:3001/court`,payload);
            return response
        }
        
    } catch (e) {
        console.log(e.response.data)
    }
} 