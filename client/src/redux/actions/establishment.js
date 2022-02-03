import { ALL_ESTABLISHMENTS, FILTER_BY_LOCATION, FILTER_BY_NAME, FILTER_BY_SPORT, GET_ESTABLISHMENT, SORT_BY_AVAILABILITY, SORT_BY_PRICE } from "./actionNames";
import axios from 'axios';
const serverUrl = 'localhost'


export const getEstablishment = (id) => {
    return async (dispatch) => {
        var result = await axios(`http://${serverUrl}:3001/establishments/${id}`);
        return dispatch({
            type: GET_ESTABLISHMENT,
            payload: result.data
        })
    }
}
export const postEstablishment = (payload) => {
    return async function() {
        var establishment = await axios.post(`http://${serverUrl}:3001/establishment`, payload)
        return establishment
    }
}

export const allEstablishments = () => {
    return async (dispatch) => {
        var results = await axios(`http://${serverUrl}:3001/establishments`)
        return dispatch({
            type: ALL_ESTABLISHMENTS,
            payload: results.data
        })
    }
}

export const filterBySport = () => {
    return async(dispatch) =>{
        var results = await axios(`http://${serverUrl}:3001/`)
        return dispatch({
            type: FILTER_BY_SPORT,
            payload: results.data
        })
    }
}

export const filterByLocation = () => {
    return async(dispatch) =>{
        var results = await axios(`http://${serverUrl}:3001/`)
        return dispatch({
            type: FILTER_BY_LOCATION,
            payload: results.data
        })
    }
}

export const filterByName = (name) => {
    return async(dispatch) =>{
        var results = await axios(`http://${serverUrl}:3001/establishment?name=${name}`)
        return dispatch({
            type: FILTER_BY_NAME,
            payload: results.data
        })
    }
}

export const sortByprice = () => {
    return async(dispatch) =>{
        var results = await axios(`http://${serverUrl}:3001/`)
        return dispatch({
            type: SORT_BY_PRICE,
            payload: results.data
        })
    }
}

export const sortByAvailability = () => {
    return async(dispatch) =>{
        var results = await axios(`http://${serverUrl}:3001/`)
        return dispatch({
            type: SORT_BY_AVAILABILITY,
            payload: results.data
        })
    }
}