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

export const postEstablishment = (payload) => {
    return async function() {
        var establishment = await axios.post("", payload)
        return establishment
    }
}