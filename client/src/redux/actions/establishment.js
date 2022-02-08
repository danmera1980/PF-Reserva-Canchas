import { ALL_ESTABLISHMENTS, FILTER_BY_LOCATION, FILTER_BY_NAME, FILTER_BY_SPORT, GET_ESTABLISHMENT, SERVER_URL, SORT_BY_AVAILABILITY, SORT_BY_PRICE } from "./actionNames";
import axios from 'axios';

export function postEstablishment(payload, userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function() {
        var establishment = await axios.post(`${SERVER_URL}/establishment`, payload, { headers: headers })
        return establishment
    }
}

export const addUserToEstablishment = (payload) => {
    return async function() {
        var info = await axios.post(`${SERVER_URL}establishment/addUserToEstablishment`, payload)
        return info
    }
}

export const getEstablishment = (id) => {
    return async (dispatch) => {
        var result = await axios(`${SERVER_URL}/establishments/${id}`);
        return dispatch({
            type: GET_ESTABLISHMENT,
            payload: result.data
        })
    }
}


export const allEstablishments = () => {
    return async (dispatch) => {
        var results = await axios(`${SERVER_URL}/cards`)
        return dispatch({
            type: ALL_ESTABLISHMENTS,
            payload: results.data
        })
    }
}

export const filterBySport = (sport) => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/findsport?sport=${sport}`)
        return dispatch({
            type: FILTER_BY_SPORT,
            payload: results.data
        })
    }
}

export const filterByLocation = (location) => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/findlocation?location=${location}`)
        return dispatch({
            type: FILTER_BY_LOCATION,
            payload: results.data
        })
    }
}

export const filterByName = (name) => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/establishment?name=${name}`)
        return dispatch({
            type: FILTER_BY_NAME,
            payload: results.data
        })
    }
}

export const sortByprice = () => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}`)
        return dispatch({
            type: SORT_BY_PRICE,
            payload: results.data
        })
    }
}

export const sortByAvailability = () => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}`)
        return dispatch({
            type: SORT_BY_AVAILABILITY,
            payload: results.data
        })
    }
}